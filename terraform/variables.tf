variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "yrci-v1"
}

variable "subscription_id" {
  description = "Azure subscription ID"
  default     = "797a03a0-9429-4393-8662-327191141b7b"
}

variable "regions" {
  description = "Regions to deploy resources"
  type = map(object({
    name                     = string
    location                 = string
    primary                  = bool
    supports_embedding       = bool
    nearest_embedding_region = string
  }))
  default = {
    eastus2 = {
      name                     = "eastus2"
      location                 = "East US 2"
      primary                  = true
      supports_embedding       = true
      nearest_embedding_region = "eastus2"
    },
  }
}

