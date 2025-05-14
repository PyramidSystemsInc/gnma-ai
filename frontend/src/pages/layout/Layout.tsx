import { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
  Dialog,
  Stack,
  TextField,
  Checkbox,
  DialogType,
  DialogFooter,
  MessageBar,
  MessageBarType
} from '@fluentui/react'
import { CopyRegular } from '@fluentui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'

import { CosmosDBStatus } from '../../api'
import Contoso from '../../assets/Contoso.svg'
import { HistoryButton, ShareButton } from '../../components/common/Button'
import { AppStateContext } from '../../state/AppProvider'

import styles from './Layout.module.css'
import TermsOfService from './TermsOfService'

// Add version information
const APP_VERSION = 'v1.0.0'

const Layout = () => {
  const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false)
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(false)
  const [showAcceptanceError, setShowAcceptanceError] = useState<boolean>(false)
  const [copyClicked, setCopyClicked] = useState<boolean>(false)
  const [copyText, setCopyText] = useState<string>('Copy URL')
  const [shareLabel, setShareLabel] = useState<string | undefined>('Share')
  const [hideHistoryLabel, setHideHistoryLabel] = useState<string>('Hide chat history')
  const [showHistoryLabel, setShowHistoryLabel] = useState<string>('Show chat history')
  const [logo, setLogo] = useState('')
  const [showLanding, setShowLanding] = useState(true)
  const appStateContext = useContext(AppStateContext)
  const ui = appStateContext?.state.frontendSettings?.ui

  useEffect(() => {
    const accepted = localStorage.getItem('disclaimerAcceptedGNMA')
    if (accepted === 'true') {
      setDisclaimerAccepted(true)
      setShowLanding(false)
    }
  }, [])

  const handleLaunchClick = () => {
    if (disclaimerAccepted) {
      localStorage.setItem('disclaimerAcceptedGNMA', 'true')
      setShowLanding(false)
      setShowAcceptanceError(false)
    } else {
      setShowAcceptanceError(true)
      // Auto-hide the error message after 5 seconds
      setTimeout(() => {
        setShowAcceptanceError(false)
      }, 5000)
    }
  }

  const handleShareClick = () => {
    setIsSharePanelOpen(true)
  }

  const handleSharePanelDismiss = () => {
    setIsSharePanelOpen(false)
    setCopyClicked(false)
    setCopyText('Copy URL')
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyClicked(true)
  }

  const handleHistoryClick = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_HISTORY' })
  }

  const handleDisclaimerClick = () => {
    setIsDisclaimerOpen(true)
  }

  const handleDisclaimerDismiss = () => {
    setIsDisclaimerOpen(false)
  }

  const handleDisclaimerCheckboxChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    setDisclaimerAccepted(!!checked)
    if (!!checked) {
      setShowAcceptanceError(false)
    }
  }

  useEffect(() => {
    if (!appStateContext?.state.isLoading) {
      setLogo(ui?.logo || Contoso)
    }
  }, [appStateContext?.state.isLoading])

  useEffect(() => {
    if (copyClicked) {
      setCopyText('Copied URL')
    }
  }, [copyClicked])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setShareLabel(undefined)
        setHideHistoryLabel('Hide history')
        setShowHistoryLabel('Show history')
      } else {
        setShareLabel('Share')
        setHideHistoryLabel('Hide chat history')
        setShowHistoryLabel('Show chat history')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dialog content configuration
  const disclaimerDialogContentProps = {
    type: DialogType.normal,
    title: 'Disclaimer',
    closeButtonAriaLabel: 'Close',
    subText: ''
  }

  return (
    <>
      {showLanding ? (
        <div className={styles.landingPage}>
          <div className={styles.landingContainer}>
            <img
              src="/static/pyramid-logo.png"
              alt="Ginnie Mae HECM MBS Chatbot"
              className={styles.landingLogo}
            />

            <div className={styles.landingContent}>
              <p className={styles.landingDescription}>
                This AI assistant is specialized in analyzing and answering questions about the Ginnie Mae Guaranteed
                Home Equity Conversion Mortgage-Backed Securities (HECM MBS). It provides information based solely on
                the Ginnie Mae HECM MBS Base Prospectus.
              </p>

              <div className={styles.disclaimerCheckboxContainer}>
                <Checkbox
                  onRenderLabel={() => (
                    <span>
                      I accept the
                      <a
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault()
                          handleDisclaimerClick()
                        }}>
                        terms and conditions
                      </a>
                    </span>
                  )}
                  styles={{
                    root: {
                      justifyContent: 'center'
                    }
                  }}
                  checked={disclaimerAccepted}
                  onChange={handleDisclaimerCheckboxChange}
                />
              </div>

              {showAcceptanceError && (
                <MessageBar
                  messageBarType={MessageBarType.error}
                  isMultiline={false}
                  dismissButtonAriaLabel="Close"
                  className={styles.errorMessage}>
                  Please accept the terms and conditions to continue.
                </MessageBar>
              )}

              <button className={styles.launchButton} onClick={handleLaunchClick}>
                Launch
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.contactSection}>
              <div className={styles.contactInfo}>
                <a href="mailto:media@gnma-ai.ai">Media Contact: media@gnma-ai.ai</a>
              </div>
              <a
                href="https://yrciblob.blob.core.windows.net/assets/press-release.pdf"
                className={styles.pressReleaseButton}>
                PRESS RELEASE
              </a>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className={styles.layout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <header className={styles.header} role={'banner'}>
            <div className={styles.headerContainer}>
              <Stack horizontal verticalAlign="center">
                <img src={logo} className={styles.headerIcon} aria-hidden="true" alt="App Logo" />
              </Stack>
              <nav className={styles.headerNavLinks}>
                <Link to="/">Chat</Link>
                <Link to="/about">About</Link>
              </nav>
            </div>
          </header>
          <Outlet />
          <Dialog
            onDismiss={handleSharePanelDismiss}
            hidden={!isSharePanelOpen}
            styles={{
              main: [
                {
                  selectors: {
                    ['@media (min-width: 480px)']: {
                      maxWidth: '600px',
                      background: '#FFFFFF',
                      boxShadow: '0px 14px 28.8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                      maxHeight: '200px',
                      minHeight: '100px'
                    }
                  }
                }
              ]
            }}
            dialogContentProps={{
              title: 'Share the web app',
              showCloseButton: true
            }}>
            <Stack horizontal verticalAlign="center" style={{ gap: '8px' }}>
              <TextField className={styles.urlTextBox} defaultValue={window.location.href} readOnly />
              <div
                className={styles.copyButtonContainer}
                role="button"
                tabIndex={0}
                aria-label="Copy"
                onClick={handleCopyClick}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                  e.key === 'Enter' || e.key === ' ' ? handleCopyClick() : null
                }>
                <CopyRegular className={styles.copyButton} />
                <span className={styles.copyButtonText}>{copyText}</span>
              </div>
            </Stack>
          </Dialog>

          <div className={styles.footerDisclaimerContainer}>
            <button className={styles.footerDisclaimerLink} onClick={handleDisclaimerClick}>
              Disclaimer
            </button>
            <span className={styles.versionInfo}>{APP_VERSION}</span>
          </div>
        </motion.div>
      )}
      <TermsOfService isOpen={isDisclaimerOpen} onDismiss={handleDisclaimerDismiss} />
    </>
  )
}

export default Layout
