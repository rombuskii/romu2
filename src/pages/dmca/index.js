import React from 'react'

const DMCA = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-xl sm:text-4xl'>DMCA Takedown Request</h1>
         <p className='text-md sm:text-xl'>

Our website provides data from links to content hosted by third-party sites. We do not host any of the xontent ourselves, and we do not have control over the content hosted on these third-party sites. We simply provide links to these sites as a service to our users.

We take copyright infringement very seriously and will promptly remove any content that violates copyright laws or the Digital Millennium Copyright Act (DMCA) when we are notified of such violations. If you believe that any content on our site infringes your copyright or the copyright of someone you represent, please send us a DMCA takedown notice.

To file a DMCA takedown notice, please provide us with the following information:
    </p>
<ul className='list-disc py-3'>
<li>Identification of the copyrighted work you claim has been infringed.</li>
<li>Identification of the material that you claim is infringing and that you want removed, with enough detail so that we may locate it.</li>
<li>Your name, address, telephone number, and email address.</li>
<li>A statement that you have a good faith belief that the use of the copyrighted material is not authorized by the copyright owner, its agent, or the law.</li>
<li>A statement that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
</ul>
<p className='text-md sm:text-xl'>
Please send your DMCA takedown notice to <a className='hover:text-green-300 underline' href="mailto:rombuski@gmail.com">rombuski@gmail.com</a>. We will promptly investigate and take appropriate action in accordance with the DMCA.
        </p>
    </div>
  )
}

export default DMCA