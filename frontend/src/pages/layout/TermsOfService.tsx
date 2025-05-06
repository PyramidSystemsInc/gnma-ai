import { useState, useEffect } from 'react'
import { Dialog, DialogType, DialogFooter, ScrollablePane } from '@fluentui/react'
import styles from './TermsOfService.module.css'

interface TermsOfServiceProps {
  isOpen: boolean
  onDismiss: () => void
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onDismiss }) => {
  // Using the external isAccepted state that's passed from the parent component
  // No need for internal state since we're using the parent's state

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Terms of Use',
    closeButtonAriaLabel: 'Close'
  }

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={dialogContentProps}
      minWidth={700}
      maxWidth={900}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 900, maxHeight: '80vh', height: '80vh' } }
      }}>
      <div className={styles.termsContent}>
        <div className={styles.termsHeader}>
          <h2>AIR-hr.ai</h2>
          <p>
            <strong>Effective date:</strong> 3/3/2025
          </p>
        </div>

        <div className={styles.termsWarning}>
          <p>
            PLEASE NOTE THAT YOUR USE OF AND ACCESS TO OUR SERVICES ARE SUBJECT TO THE FOLLOWING TERMS; IF YOU DO NOT
            AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE SERVICES IN ANY MANNER.
          </p>
        </div>

        <p>
          Welcome to the AIR-hr software application (the "Application"), which, along with the associated services,
          features, and functionalities, is referred to collectively as the "Services". Please read on to learn the
          rules and restrictions that govern your use of the Services. If you have any questions, comments, or concerns
          regarding these terms or the Services, please contact us at media@AIR-hr.ai.
        </p>

        <p>
          These Terms of Use (the "Terms") are a binding contract between you and Pyramid Systems ("Company," "we" and
          "us"). You must agree to and accept all of the Terms, or you don't have the right to use the Services. Your
          use of the Services in any way means that you agree to all of these Terms, and these Terms will remain in
          effect while you use the Services. These Terms include the provisions in this document, as well as those in
          Disclaimer at AIR-hr.ai.
        </p>

        <h3>Notice Regarding Dispute Resolution</h3>
        <p>
          These Terms contain provisions that govern how claims you and us may have against each other are resolved,
          including an agreement to arbitrate disputes, which will require you to submit claims you have against us to
          binding arbitration, and waiver of class actions and jury trial. Please read the arbitration provision
          (Section "Choice of Law; Arbitration") in these Terms as it affects your rights under these Terms.
        </p>

        <h3>Will these Terms ever change?</h3>
        <p>
          We are constantly improving our Services, so these Terms may need to change along with the Services. We
          reserve the right to change the Terms at any time, and if we do, we will bring it to your attention by placing
          a notice on the Services and/or by some other means.
        </p>
        <p>
          If you don't agree with the new Terms, you are free to reject them; unfortunately, that means you will no
          longer be able to use the Services. If you use the Services in any way after a change to the Terms is
          effective, that means you agree to all of the changes.
        </p>
        <p>
          Except for changes by us as described here, no other amendment or modification of these Terms will be
          effective unless in writing and signed by both you and us.
        </p>

        <h3>What are the basics of using the Services?</h3>
        <p>
          You represent and warrant that you are of legal age to form a binding contract. If you're agreeing to these
          Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to
          these Terms on that organization or entity's behalf and bind them to these Terms (in which case, the
          references to "you" and "your" in these Terms, except for in this sentence, refer to that organization or
          entity).
        </p>
        <p>
          You will only use the Services for your own non-commercial use, not on behalf of or for the benefit of any
          third party, and only in a way that complies with all laws that apply to you. If your use of the Services is
          prohibited by applicable laws, then you aren't authorized to use the Services. We are not responsible for your
          using the Services in a way that breaks the law.
        </p>

        <h3>Your use of the Services is subject to the following additional restrictions:</h3>
        <p>
          You represent, warrant, and agree that you will not use the Services or interact with the Services in a manner
          that:
        </p>
        <ul>
          <li>
            Infringes or violates the intellectual property rights or any other rights of anyone (including Company);
          </li>
          <li>Violates any law or regulation;</li>
          <li>
            Is harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable;
          </li>
          <li>Jeopardizes the security of the Services;</li>
          <li>Violates the security of any computer network, or cracks any passwords or security encryption codes;</li>
          <li>
            Runs Mail list, Listserv, any form of auto-responder or "spam" on the Services, or any processes that run or
            are activated while you are not on the Services, or that otherwise interfere with the proper working of the
            Services (including by placing an unreasonable load on the Services' infrastructure);
          </li>
          <li>
            "Crawls," "scrapes," or "spiders" any page, data, or portion of or relating to the Services or Content
            (through use of manual or automated means);
          </li>
          <li>Copies or stores any significant portion of the Content;</li>
          <li>
            Interfere with, or attempt to interfere with, the access of any user, host or network, including, without
            limitation, sending a virus, worm, overloading, flooding, spamming, or mail-bombing the Services, or
            attacking the Services via a denial-of-service attack or a distributed denial-of-service attack;
          </li>
          <li>
            Decompiles, reverse engineers, or otherwise attempts to obtain the source code or underlying ideas or
            information of or relating to the Services.
          </li>
        </ul>
        <p>
          A violation of any of the foregoing is grounds for termination of your right to use or access the Services.
        </p>
        <p>
          Although we're not obligated to monitor access to or use of the Services, we have the right to do so for
          purposes of operating the Service, ensuring compliance with these Terms, and to comply with applicable law. We
          have the right to investigate violations of these Terms or conduct that affects the Services. We may consult
          and cooperate with law enforcement authorities to prosecute users who violate the law. You hereby waive and
          hold harmless Company and its affiliates, licensees, and service providers from any claims resulting from any
          action taken during, or taken as a consequence of, investigations by either Company or law enforcement
          authorities.
        </p>

        <h3>Who has rights in the Services?</h3>
        <p>
          As between you and Company, all materials and content displayed or available on or through the Services,
          including, but not limited to, text (including hidden text within our source code), graphics, marks, logos,
          data, articles, photos, images (all of the foregoing, the "Content") are owned by Company and protected by
          copyright, trademark, and/or other intellectual property laws. You promise to abide by all copyright notices,
          trademark rules, and restrictions contained in any Content you access through the Services, and you may not
          use, copy, reproduce, modify, translate, create derivative works based on, publish, broadcast, transmit,
          distribute, perform, upload, display, license, sell or otherwise exploit for any purpose any Content (i)
          without the prior consent of Company (or such other owner of that Content as identified via the Services), or
          (ii) in a way that violates someone else's (including Company's) rights. In addition, the entire content of
          the Application is copyrighted as a collective work under the United States copyright laws, and we own the
          copyright in the selection, coordination, arrangement, and enhancement of such content. You acknowledge and
          agree that you do not acquire any ownership rights by accessing or using the Services.
        </p>
        <p>
          You understand that as between you and Company, Company owns the Services, including the Content on the
          Services, except for any User Submission created by you. Without limiting the foregoing, you specifically
          acknowledge that, as between you and Company, any marks, logos, designs or names that are be displayed on or
          through the Services are trademarks of Company (the "Company Trademarks"). Company retains all rights in and
          to the Company Trademarks. You may not use or display any Company Trademarks without Company's prior written
          consent. All goodwill generated from the use of Company Trademarks will inure to our exclusive benefit.
        </p>
        <p>
          You agree not to modify, publish, transmit, participate in the transfer or sale of, reproduce (except as
          expressly provided in this Section), create derivative works based on, or otherwise exploit any of the
          Services.
        </p>
        <p>
          The Services may allow you to copy or download certain Content. The restrictions above apply to that Content
          as well.
        </p>

        <h3>Do I have to grant any licenses to Company or to other users?</h3>
        <p>
          Anything you upload, share, or provide through the Services is your "User Submission." You represent that your
          User Submissions (i) do not infringe or violate the intellectual property rights or any other rights of anyone
          else (including Company), (ii) do not violate any law or regulation, and (iii) are not harmful, fraudulent,
          deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable.
        </p>
        <p>
          If you share a User Submission publicly on the Services and/or in a manner that more than just you can view,
          or if you provide us (in a direct email, through "Contact Us" form, or otherwise) with any feedback,
          suggestions, improvements, enhancements, and/or feature requests relating to the Services ("Feedback"), then
          such Feedback will be deemed non-confidential and we shall be free to use such Feedback on an unrestricted
          basis. Without limiting the foregoing, you hereby grant Company a perpetual, irrevocable, fully paid-up,
          royalty-free, transferable, worldwide right and license to display, perform, and distribute such User
          Submission or Feedback for the purpose of making such content generally accessible to the public and providing
          the Services necessary to do so, as well as all other rights necessary to use and exercise all rights in such
          User Submission and Feedback in connection with the Services and/or otherwise in connection with Company's
          business. Also, for any User Submission you shared publicly on the Services, you grant all other users of the
          Services a license to access such User Submission, and to use and exercise all rights in it, as permitted by
          the functionality of the Services.
        </p>
        <p>
          Please note that all of the above licenses are subject to our Privacy Policy to the extent they relate to User
          Submissions with your personally-identifiable information. You agree that the licenses you grant are
          royalty-free, perpetual, sublicensable, irrevocable, and worldwide.
        </p>
        <p>
          Finally, you understand and agree that Company, in performing the required technical steps to provide the
          Services to our users (including you), may need to make changes to your User Submissions to conform and adapt
          those User Submissions to the technical requirements of connection networks, devices, or services, and the
          foregoing licenses include the rights to do so.
        </p>

        <h3>Who is responsible for what I see and do on the Services?</h3>
        <p>
          Any information or content publicly posted or privately transmitted through the Services is the sole
          responsibility of the person from whom such content originated, and you access all such information and
          content at your own risk, and we aren't liable for any errors or omissions in any information or content
          provided by anyone other than Company or for any damages or loss you might suffer in connection with it. We
          cannot control and have no duty to take any action regarding how you may interpret and use the Content or what
          actions you may take as a result of having been exposed to the Content, and you hereby release us from all
          liability for you having acquired or not acquired Content through the Services.
        </p>
        <p>You are responsible for all your activity in connection with the Services.</p>
        <p>
          The Services may contain links or connections to third party websites or services that are not owned or
          controlled by Company. When you access third party websites or use third party services, you accept that there
          are risks in doing so, and that Company is not responsible for such risks. We encourage you to be aware when
          you leave the Services and to read the terms and conditions and privacy policy of each third party website or
          service that you visit or utilize. You agree to abide by the terms and conditions and privacy policy of each
          third party website or service that you visit or utilize through the Services. Company has no control over,
          and assumes no responsibility for, the content, accuracy, privacy policies, or practices of or opinions
          expressed in any third party websites or by any third party that you interact with through the Services. By
          using the Services, you release and hold us harmless from any and all liability arising from your use of any
          third party website or service.
        </p>
        <p>
          If there is a dispute between participants on this site, or between users and any third party, you agree that
          Company is under no obligation to become involved. In the event that you have a dispute with one or more other
          users, you release Company, its officers, employees, agents, and successors from claims, demands, and damages
          of every kind or nature, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of
          or in any way related to such disputes and/or our Services. If you are a California resident, you shall and
          hereby do waive California Civil Code Section 1542, which says: "A general release does not extend to claims
          which the creditor does not know or suspect to exist in his or her favor at the time of executing the release,
          which, if known by him or her must have materially affected his or her settlement with the debtor."
        </p>

        <h3>Will Company ever change the Services?</h3>
        <p>
          The Services may change over time. We may, at our discretion, suspend or discontinue any part of the Services,
          or we may introduce new features or impose limits on certain features or restrict access to parts or all of
          the Services. We'll make our best effort to give you notice when we make a material change to the Services
          that would adversely affect you, but this isn't always practical. Similarly, we reserve the right to remove
          any Content from the Services at any time, for any reason (including, but not limited to, if someone alleges
          you contributed that Content in violation of these Terms), in our sole discretion, and without notice.
        </p>

        <h3>Termination of the Services</h3>
        <p>
          Company is free to immediately terminate (or suspend access to) your use of the Services, for any reason in
          our discretion (or no reason), including your breach of these Terms. Company has the sole right to decide
          whether you are in violation of any of the restrictions set forth in these Terms.
        </p>
        <p>
          Provisions that, by their nature, should survive termination of these Terms shall survive termination,
          including but not limited to: any obligation you have to pay us or indemnify us, any limitations on our
          liability, any terms regarding ownership or intellectual property rights, and terms regarding disputes between
          us.
        </p>

        <h3>Important Terms</h3>
        <h4>Data Privacy & Security</h4>
        <p>
          The Application may collect and process user inputs to improve response quality and system performance. All
          data handling practices are subject to our Privacy Policy and security protocols.
        </p>
        <p>
          You should refrain from entering confidential, personal, or sensitive information when interacting with the
          Service. By using the Service, You acknowledge and accept the Company's Privacy Policy.
        </p>

        <h4>Warranty Disclaimers</h4>
        <p>
          The Services provide responses based on Title 5 of the Code of Federal Regulations (5 CFR) and are powered by
          technology developed by Pyramid Systems Inc. The Services have been trained and informed by subject matter
          professionals from YRCI. The information provided by the Application is dependent on the most recent version
          of 5 CFR available at the time of inquiry. While efforts are made to ensure the accuracy and currency of
          responses, You should verify information against official regulatory sources. The Services do not provide
          legal or authoritative interpretations of federal regulations and should not be relied upon as a substitute
          for professional human resources or legal advice. By using the Service, You acknowledge that the information
          is provided on an "as-is" basis and that the developers and trainers of this software assume no liability for
          any decisions made based on its responses.
        </p>
        <p>
          By using the Services, You agree that the Content is provided on an "as-is" basis and that the developers and
          trainers of the Services assume no liability for any decisions made based on its responses. Neither Company
          nor its licensors make any representations or warranties concerning the Services or any Content contained in
          or accessed through the Services, and we will not be responsible or liable for the accuracy, copyright
          compliance, legality, or decency of material contained in or accessed through the Services. THE SERVICES AND
          CONTENT ARE PROVIDED BY COMPANY (AND ITS LICENSORS) ON AN "AS-IS" BASIS, WITHOUT WARRANTIES OR ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT USE OF THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, TIMELY,
          UNFAILINGLY SECURE, WILL MEET YOUR REQUIREMENTS, THAT ANY RESULTS OBTAINED FROM THE USE OF THE SERVICES WILL
          BE ACCURATE OR RELIABLE, THAT THE QUALITY OF ANY INFORMATION OR MATERIALS OBTAINED BY YOU THROUGH THE SERVICES
          WILL MEET YOUR EXPECTATIONS, OR THAT ANY ERRORS IN THE SERVICES WILL BE CORRECTED. SOME STATES DO NOT ALLOW
          LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
        </p>

        <h4>Limitation of Liability</h4>
        <p>
          TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING,
          WITHOUT LIMITATION, TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE) SHALL COMPANY (OR ITS LICENSORS) BE LIABLE
          TO YOU OR TO ANY OTHER PERSON FOR (A) ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND,
          INCLUDING DAMAGES FOR LOST PROFITS, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE
          OR MALFUNCTION, OR (B) ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF THE GREATER OF (I) \$10 OR (II) THE AMOUNTS
          PAID BY YOU TO COMPANY IN CONNECTION WITH THE SERVICES, OR (III) ANY MATTER BEYOND OUR REASONABLE CONTROL.
          SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATION AND
          EXCLUSIONS MAY NOT APPLY TO YOU.
        </p>

        <h4>Waiver of California Civil Code Section 1542—California Residents Only</h4>
        <p>
          If you are a California resident, you waive California Civil Code Section 1542, which says: "A general release
          does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of
          executing the release, which if known by him must have materially affected his settlement with the debtor." If
          you are a resident of another jurisdiction, in or outside of the United States, you waive any comparable
          statute or doctrine.
        </p>

        <h4>Scope of Disclaimers, Exclusions, and Limitations</h4>
        <p>
          The disclaimers, exclusions, and limitations stated in these Terms apply to the greatest extent allowed by
          law, but no more. We do not intend to deprive you of any mandatory protections provided to you by law. Because
          some jurisdictions may prohibit the disclaimer of some warranties, the exclusion of some damages, or other
          matters, one or more of the disclaimers, exclusions, or limitations will not apply to you.
        </p>

        <h4>Indemnity</h4>
        <p>
          To the fullest extent allowed by applicable law, you agree to indemnify and hold Company, its affiliates,
          officers, agents, employees, contractors, licensors and partners harmless from and against any and all claims,
          liabilities, damages (actual and consequential), losses and expenses (including attorneys' fees) arising from
          or in any way related to any third party claims relating to or arising out of: (a) your use of the Services
          (including any actions taken by a third party using your account); (b) your violation of any rights of any
          third party; (c) any claim related to your User Submissions; (d) your violation of applicable law; and (e) any
          violation of these Terms by you or on your behalf. In the event of such a claim, suit, or action ("Claim"), we
          will attempt to provide notice of the Claim to the contact information we have for your account (provided that
          failure to deliver such notice shall not eliminate or reduce your indemnification obligations hereunder). This
          indemnification obligation will continue after you stop using the Application and/or the Services. We reserve
          the right to assume the exclusive defense and control of any claim and matter otherwise subject to
          indemnification by you at your expense, and you shall not in any event settle or otherwise dispose of any
          Claim without our prior written consent.
        </p>

        <h4>Assignment</h4>
        <p>
          You may not assign, delegate or transfer these Terms or your rights or obligations hereunder, or your Services
          account, in any way (by operation of law or otherwise) without Company's prior written consent. We may
          transfer, assign, or delegate these Terms and our rights and obligations without your consent.
        </p>

        <h4>Choice of Law; Arbitration</h4>
        <p>
          These Terms are governed by and will be construed under the laws of the Commonwealth of Virginia, without
          regard to the conflicts of laws provisions thereof. Any dispute arising from or relating to the subject matter
          of these Terms shall be finally settled in Virginia, in English, in accordance with the Streamlined
          Arbitration Rules and Procedures of Judicial Arbitration and Mediation Services, Inc. ("JAMS") then in effect,
          by one commercial arbitrator with substantial experience in resolving intellectual property and commercial
          contract disputes, who shall be selected from the appropriate list of JAMS arbitrators in accordance with such
          Rules. Judgment upon the award rendered by such arbitrator may be entered in any court of competent
          jurisdiction. Notwithstanding the foregoing obligation to arbitrate disputes, each party shall have the right
          to pursue injunctive or other equitable relief at any time, from any court of competent jurisdiction. To the
          extent any provision of these Terms conflicts with the JAMS Minimum Standards for the subject dispute, the
          latter shall control. The JAMS rules and procedures can be found at
          https://www.jamsadr.com/adr-rules-procedures/. Ultimately, the selected arbitrator must have expertise in the
          subject matter of the dispute. In the event that you initiate arbitration against us, you will be required to
          pay to JAMS a fee of \$250 (and/or such other amount(s) as may be required by JAMS) in connection with the
          cost of such arbitration. The parties will use good faith efforts to complete the arbitration within one
          hundred twenty (120) days of either giving notice or filing a demand to arbitrate with the JAMS (whichever
          shall first occur).
        </p>
        <p>
          To the fullest extent permitted by applicable law, no arbitration under these Terms shall be joined to an
          arbitration involving any other party subject to these Terms, whether through class arbitration proceedings or
          otherwise. You agree to an arbitration on an individual basis. IN ANY DISPUTE, NEITHER YOU NOR WE WILL BE
          ENTITLED TO JOIN OR CONSOLIDATE CLAIMS BY OR AGAINST OTHER USERS IN COURT OR IN ARBITRATION OR OTHERWISE
          PARTICIPATE IN ANY CLAIM AS A CLASS REPRESENTATIVE, CLASS MEMBER, OR IN A PRIVATE ATTORNEY GENERAL CAPACITY.
          The arbitral tribunal may not consolidate more than one (1) person's claims, and may not otherwise preside
          over any form of a representative or class proceeding. The arbitral tribunal has no power to consider the
          enforceability of this class arbitration waiver and any challenge to the class arbitration waiver may only be
          raised in a court of competent jurisdiction.
        </p>

        <h4>Miscellaneous</h4>
        <p>
          The failure of either you or us to exercise, in any way, any right herein shall not be deemed a waiver of any
          further rights hereunder. If any provision of these Terms is found to be unenforceable or invalid, that
          provision will be limited or eliminated, to the minimum extent necessary, so that these Terms shall otherwise
          remain in full force and effect and enforceable. You and Company agree that these Terms are the complete and
          exclusive statement of the mutual understanding between you and Company, and that it supersedes and cancels
          all previous written and oral agreements, communications and other understandings relating to the subject
          matter of these Terms. You and Company agree there are no third-party beneficiaries intended under these Terms
          other than Company's licensors, if and as applicable.
        </p>
      </div>
    </Dialog>
  )
}

export default TermsOfService
