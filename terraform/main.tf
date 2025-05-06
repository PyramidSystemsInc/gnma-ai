terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}
locals {
  system_message = templatefile("./system-prompt.tpl", {})

  # Supported App Service regions with mappings to OpenAI regions
  asp_supported_regions = {
    "eastus2" = {
      location      = "East US 2"
      instances     = 1
      openai_region = "eastus2" # Direct mapping - OpenAI exists here and only supported on built in vectorization for search
    },
  }


  # Generate all ASP configurations
  all_asps = flatten([
    for region, config in local.asp_supported_regions : [
      for i in range(1, config.instances + 1) : {
        name          = "${region}-${i}"
        region        = region
        location      = config.location
        openai_region = config.openai_region
        custom_domain = "www.gnma.ai"
      }
    ]
  ])
  primary_region = [for k, v in var.regions : v if v.primary][0]
  embedding_regions = {
    for k, v in var.regions : k => v if v.supports_embedding
  }
}
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Resource group reference
data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

# App Service Plans - one per region
resource "azurerm_service_plan" "asp" {
  for_each = { for asp in local.all_asps : asp.name => asp }

  name                = "gnm-ai-${each.key}"
  location            = each.value.location
  resource_group_name = data.azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "P1v3" # Adjusted as needed
}

data "azurerm_cognitive_account" "openai" {
  for_each = var.regions

  name                = "air-hr-${each.key}"
  resource_group_name = data.azurerm_resource_group.rg.name
}

# resource "azurerm_cognitive_deployment" "embedding" {
#   for_each = local.embedding_regions

#   name                 = "gnma-embedding-3-large"
#   cognitive_account_id = azurerm_cognitive_account.openai[each.key].id


#   model {
#     format  = "OpenAI"
#     name    = "text-embedding-3-large"
#     version = "1"
#   }

#   sku {
#     name     = "Standard"
#     capacity = 350
#   }

# }

# # Deploy the o4-mini model in each region
# resource "azurerm_cognitive_deployment" "gpt4o" {
#   for_each = azurerm_cognitive_account.openai

#   name                 = "o4-mini"
#   cognitive_account_id = each.value.id

#   model {
#     format  = "OpenAI"
#     name    = "o4-mini"
#     version = "2025-04-16"
#   }

#   sku {
#     name     = "GlobalStandard"
#   }
# }

# App Services - one per region
resource "azurerm_linux_web_app" "app" {

  for_each = { for asp in local.all_asps : asp.name => asp }

  name                    = "gnma-ai-${each.key}"
  location                = each.value.location
  resource_group_name     = data.azurerm_resource_group.rg.name
  service_plan_id         = azurerm_service_plan.asp[each.key].id
  client_affinity_enabled = true

  app_settings = {
    "DEBUG"                                 = false
    "OTEL_SERVICE_NAME"                     = "gnma-ai${each.key}"
    OTEL_RESOURCE_ATTRIBUTES                = "service.instance.id=gnma-ai${each.key}"
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.central.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.central.connection_string
    "APPINSIGHTS_PROFILERFEATURE_VERSION"   = "disabled"
    "APPINSIGHTS_SNAPSHOTFEATURE_VERSION"   = "disabled"
    "AUTH_CLIENT_SECRET"                    = ""
    "AUTH_ENABLED"                          = "False"
    #"AZURE_COSMOSDB_ACCOUNT"                          = "db-yrci-large"
    #"AZURE_COSMOSDB_CONVERSATIONS_CONTAINER"          = "conversations"
    #"AZURE_COSMOSDB_DATABASE"                         = "db_conversation_history"
    "AZURE_COSMOSDB_MONGO_VCORE_CONNECTION_STRING" = ""
    "AZURE_COSMOSDB_MONGO_VCORE_CONTAINER"         = ""
    "AZURE_COSMOSDB_MONGO_VCORE_CONTENT_COLUMNS"   = ""
    "AZURE_COSMOSDB_MONGO_VCORE_DATABASE"          = ""
    "AZURE_COSMOSDB_MONGO_VCORE_FILENAME_COLUMN"   = ""
    "AZURE_COSMOSDB_MONGO_VCORE_INDEX"             = ""
    "AZURE_COSMOSDB_MONGO_VCORE_TITLE_COLUMN"      = ""
    "AZURE_COSMOSDB_MONGO_VCORE_URL_COLUMN"        = ""
    "AZURE_COSMOSDB_MONGO_VCORE_VECTOR_COLUMNS"    = ""
    "AZURE_OPENAI_EMBEDDING_ENDPOINT"              = data.azurerm_cognitive_account.openai[var.regions[each.value.openai_region].nearest_embedding_region].endpoint
    "AZURE_OPENAI_EMBEDDING_KEY"                   = data.azurerm_cognitive_account.openai[var.regions[each.value.openai_region].nearest_embedding_region].primary_access_key
    # "AZURE_OPENAI_EMBEDDING_DEPLOYMENT"               = var.regions[each.value.openai_region].supports_embedding ? azurerm_cognitive_deployment.embedding[each.value.openai_region].name : azurerm_cognitive_deployment.embedding[var.regions[each.value.openai_region].nearest_embedding_region].name
    "AZURE_OPENAI_EMBEDDING_NAME"                     = "text-embedding-3-large"
    "AZURE_OPENAI_ENDPOINT"                           = data.azurerm_cognitive_account.openai[each.value.openai_region].endpoint
    "AZURE_OPENAI_KEY"                                = data.azurerm_cognitive_account.openai[each.value.openai_region].primary_access_key
    "AZURE_OPENAI_MAX_TOKENS"                         = "32256"
    "AZURE_OPENAI_MODEL"                              = "gpt-4o"
    "AZURE_OPENAI_MODEL_NAME"                         = "gpt-4o"
    "AZURE_OPENAI_RESOURCE"                           = data.azurerm_cognitive_account.openai[each.value.openai_region].name
    "AZURE_OPENAI_STOP_SEQUENCE"                      = ""
    "AZURE_OPENAI_SYSTEM_MESSAGE"                     = local.system_message
    "AZURE_OPENAI_TEMPERATURE"                        = "0.7"
    "AZURE_OPENAI_TOP_P"                              = "0.95"
    "AZURE_SEARCH_CONTENT_COLUMNS"                    = "content"
    "AZURE_SEARCH_ENABLE_IN_DOMAIN"                   = "false"
    "AZURE_SEARCH_FILENAME_COLUMN"                    = "source_document"
    "AZURE_SEARCH_INDEX"                              = "gnma-ai"
    "AZURE_SEARCH_KEY"                                = data.azurerm_search_service.search.primary_key
    "AZURE_SEARCH_PERMITTED_GROUPS_COLUMN"            = ""
    "AZURE_SEARCH_QUERY_TYPE"                         = "vector_semantic_hybrid"
    "AZURE_SEARCH_SEMANTIC_SEARCH_CONFIG"             = "cfr-semantic-config"
    "AZURE_SEARCH_SERVICE"                            = data.azurerm_search_service.search.name
    "AZURE_SEARCH_STRICTNESS"                         = "3"
    "AZURE_SEARCH_TITLE_COLUMN"                       = "section_title"
    "AZURE_SEARCH_TOP_K"                              = "50"
    "AZURE_SEARCH_URL_COLUMN"                         = "souce_document"
    "AZURE_SEARCH_USE_SEMANTIC_SEARCH"                = "true"
    "AZURE_SEARCH_VECTOR_COLUMNS"                     = "vector"
    "ApplicationInsightsAgent_EXTENSION_VERSION"      = "~3"
    "DATASOURCE_TYPE"                                 = "AzureCognitiveSearch"
    "DEBUG"                                           = "True"
    "DiagnosticServices_EXTENSION_VERSION"            = "disabled"
    "ELASTICSEARCH_CONTENT_COLUMNS"                   = ""
    "ELASTICSEARCH_EMBEDDING_MODEL_ID"                = ""
    "ELASTICSEARCH_ENABLE_IN_DOMAIN"                  = "false"
    "ELASTICSEARCH_ENCODED_API_KEY"                   = ""
    "ELASTICSEARCH_ENDPOINT"                          = ""
    "ELASTICSEARCH_FILENAME_COLUMN"                   = ""
    "ELASTICSEARCH_INDEX"                             = ""
    "ELASTICSEARCH_QUERY_TYPE"                        = ""
    "ELASTICSEARCH_STRICTNESS"                        = "3"
    "ELASTICSEARCH_TITLE_COLUMN"                      = ""
    "ELASTICSEARCH_TOP_K"                             = "5"
    "ELASTICSEARCH_URL_COLUMN"                        = ""
    "ELASTICSEARCH_VECTOR_COLUMNS"                    = ""
    "InstrumentationEngine_EXTENSION_VERSION"         = "disabled"
    "MONGODB_APP_NAME"                                = ""
    "MONGODB_COLLECTION_NAME"                         = ""
    "MONGODB_CONTENT_COLUMNS"                         = ""
    "MONGODB_DATABASE_NAME"                           = ""
    "MONGODB_ENABLE_IN_DOMAIN"                        = "false"
    "MONGODB_ENDPOINT"                                = ""
    "MONGODB_FILENAME_COLUMN"                         = ""
    "MONGODB_INDEX_NAME"                              = ""
    "MONGODB_PASSWORD"                                = ""
    "MONGODB_STRICTNESS"                              = "3"
    "MONGODB_TITLE_COLUMN"                            = ""
    "MONGODB_TOP_K"                                   = "5"
    "MONGODB_URL_COLUMN"                              = ""
    "MONGODB_USERNAME"                                = ""
    "MONGODB_VECTOR_COLUMNS"                          = ""
    "SCM_DO_BUILD_DURING_DEPLOYMENT"                  = "true"
    "SnapshotDebugger_EXTENSION_VERSION"              = "disabled"
    "XDT_MicrosoftApplicationInsights_BaseExtensions" = "disabled"
    "XDT_MicrosoftApplicationInsights_Mode"           = "recommended"
    "XDT_MicrosoftApplicationInsights_PreemptSdk"     = "disabled"

  }

  site_config {
    application_stack {
      python_version = "3.11"
    }

    always_on           = true
    minimum_tls_version = "1.2"
    ftps_state          = "FtpsOnly"
    app_command_line    = "python3 -m gunicorn app:app"
    http2_enabled       = false
  }

  auth_settings_v2 {
    auth_enabled             = false
    default_provider         = "azureactivedirectory"
    excluded_paths           = []
    forward_proxy_convention = "NoProxy"
    http_route_api_prefix    = "/.auth"
    require_authentication   = true
    require_https            = true
    runtime_version          = "~1"
    unauthenticated_action   = "RedirectToLoginPage"

    active_directory_v2 {
      allowed_applications            = []
      allowed_audiences               = []
      allowed_groups                  = []
      allowed_identities              = []
      client_id                       = "7f5c56b7-a251-4dc7-95ff-9bdc89d4afb7"
      client_secret_setting_name      = "AUTH_CLIENT_SECRET"
      jwt_allowed_client_applications = []
      jwt_allowed_groups              = []
      login_parameters = {
        "response_type" = "code id_token"
        "scope"         = "openid offline_access profile https://graph.microsoft.com/User.Read"
      }
      tenant_auth_endpoint        = "https://login.microsoftonline.com/bffe4a04-f583-41be-9a3e-0fa4b1c82af3/v2.0"
      www_authentication_disabled = false
    }


    login {
      allowed_external_redirect_urls    = []
      cookie_expiration_convention      = "FixedTime"
      cookie_expiration_time            = "08:00:00"
      nonce_expiration_time             = "00:05:00"
      preserve_url_fragments_for_logins = false
      token_refresh_extension_time      = 72
      token_store_enabled               = true
      validate_nonce                    = true
    }

  }

  logs {
    detailed_error_messages = false
    failed_request_tracing  = false

    http_logs {
      file_system {
        retention_in_days = 5
        retention_in_mb   = 35
      }
    }
  }

  sticky_settings {
    app_setting_names = [
      "APPINSIGHTS_INSTRUMENTATIONKEY",
      "APPINSIGHTS_PROFILERFEATURE_VERSION",
      "APPINSIGHTS_SNAPSHOTFEATURE_VERSION",
      "ApplicationInsightsAgent_EXTENSION_VERSION",
      "DiagnosticServices_EXTENSION_VERSION",
      "InstrumentationEngine_EXTENSION_VERSION",
      "SnapshotDebugger_EXTENSION_VERSION",
      "XDT_MicrosoftApplicationInsights_BaseExtensions",
      "XDT_MicrosoftApplicationInsights_Mode",
      "XDT_MicrosoftApplicationInsights_PreemptSdk",
      "APPLICATIONINSIGHTS_CONNECTION_STRING ",
      "APPLICATIONINSIGHTS_CONFIGURATION_CONTENT",
      "XDT_MicrosoftApplicationInsightsJava",
      "XDT_MicrosoftApplicationInsights_NodeJS",
    ]
  }

  identity {
    type = "SystemAssigned"
  }

  https_only = true

}


resource "azurerm_app_service_source_control" "github" {
  for_each               = azurerm_linux_web_app.app
  app_id                 = each.value.id
  repo_url               = "https://github.com/PyramidSystemsInc/gnma-ai.git"
  branch                 = "main"
  use_manual_integration = true

}

# Use local-exec provisioner to force sync after apply
resource "null_resource" "sync_git_repo" {
  for_each = azurerm_linux_web_app.app

  triggers = {

    # The timestamp will be different on every run, forcing this resource to be recreated each time
    always_run = timestamp()
    app_id     = each.value.id
  }

  provisioner "local-exec" {
    command = "az webapp deployment source sync --name ${each.value.name} --resource-group ${data.azurerm_resource_group.rg.name}"
  }

  depends_on = [azurerm_app_service_source_control.github]
}

resource "azurerm_application_insights" "central" {
  name                = "gnma-ai-central-appinsights"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  application_type    = "web"
  workspace_id        = "/subscriptions/797a03a0-9429-4393-8662-327191141b7b/resourceGroups/${data.azurerm_resource_group.rg.name}/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-797a03a0-9429-4393-8662-327191141b7b-EUS2"
  # Optional: workspace_id if using Log Analytics
}

# resource "azurerm_search_service" "search" {
#   name                = "gnma-ai"
#   resource_group_name = data.azurerm_resource_group.rg.name
#   location            = data.azurerm_resource_group.rg.location
#   sku                 = "standard"
#   replica_count       = 1
#   partition_count     = 1
#   hosting_mode        = "default"

#   public_network_access_enabled = true
#   local_authentication_enabled  = true

#   semantic_search_sku = "standard"

#   # Note: These fields will be managed by Terraform after import
#   lifecycle {
#     ignore_changes = [
#       tags["ProjectType"]
#     ]
#   }
# }

data "azurerm_search_service" "search" {
  name                = "yrci"
  resource_group_name = data.azurerm_resource_group.rg.name
}

locals {
  domain_verification_records = {
    for app in local.all_asps :
    app.name => {
      domain          = app.custom_domain
      verification_id = lookup(app, "custom_domain", null) != null ? azurerm_linux_web_app.app[app.name].custom_domain_verification_id : null
      txt_record_name = lookup(app, "custom_domain", null) != null ? "asuid.www" : null
    } if lookup(app, "custom_domain", null) != null
  }
}