const fs = require('fs');

let content = fs.readFileSync('e:\\greenspout\\contact.html', 'utf8');

// The block to replace
const startMarker = '<div class="dpojqorn" data-kirki="dpwbw4g9">';
const endMarker = '</div></div></div></div></div></div>'; // Need to be careful here

// Let's use a regex or string splitting
const startIndex = content.indexOf(startMarker);
if (startIndex !== -1) {
    // Find the end of this block by finding the iframe end then the closing divs
    const iframeEnd = content.indexOf('</iframe>', startIndex);
    if (iframeEnd !== -1) {
        let endIndex = content.indexOf('</div></div></div></div></div></div>', iframeEnd);
        if (endIndex !== -1) {
            // Include the length of the string to be replaced
            endIndex += '</div></div>'.length; // Just replacing up to the wrapper's closing divs
            
            const newLayout = `
<div class="premium-contact-wrapper" style="display: flex; flex-wrap: wrap; gap: 0; margin-top: 40px; margin-bottom: 80px; width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; background: #fff; border-radius: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); overflow: hidden;">
    
    <!-- Left Side: Video -->
    <div class="premium-contact-video" style="flex: 1 1 50%; min-width: 350px; position: relative; overflow: hidden; background: #000; min-height: 600px;">
        <video autoplay loop muted playsinline preload="auto" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
            <source src="./assets/Day-night-day_timelapse_video_202605240545.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <!-- Right Side: Contact Info -->
    <div class="premium-contact-info" style="flex: 1 1 50%; min-width: 350px; padding: 60px; display: flex; flex-direction: column; justify-content: center; background: #dce6cc;">
        
        <div style="display: flex; flex-direction: column; gap: 30px; height: 100%;">
            <div>
                <h3 style="color: #293920; font-size: 28px; font-weight: 700; margin: 0 0 12px 0;">কেএসএফএল এগ্রো লিঃ এর প্রধান কার্যালয়</h3>
                <p style="color: #4a5c32; font-size: 18px; margin: 0 0 16px 0; line-height: 1.6; font-weight: 500;">ঠিকানা: মিরপুর ১০, ঢাকা, বাংলাদেশ (১২৪০/৭ কাজীপাড়া মিরপুর ১০)</p>
                <p style="color: #5a6d3f; font-size: 16px; margin: 0; line-height: 1.7;">আপনি যে কোনো সময় আমন্ত্রিত! আমাদের সমস্ত পণ্য নিজে দেখতে, বীজের গুণমান যাচাই করতে অথবা আমাদের টিমের সাথে যে কোনো প্রশ্ন নিয়ে আলোচনা করতে আমাদের প্রধান কার্যালয় পরিদর্শনে আপনাকে সাদর আমন্ত্রণ।</p>
            </div>

            <div>
                <h3 style="color: #293920; font-size: 22px; font-weight: 600; margin: 0 0 8px 0;">পরিদর্শনের দিন</h3>
                <p style="color: #4a5c32; font-size: 17px; margin: 0; font-weight: 500;">কল টু ভিজিট: +৮৮০১৭১৫২৪৯৩৭১ (সকাল ৯টা-রাত ১০টা)</p>
            </div>

            <div style="display: flex; flex-direction: column; flex-grow: 1;">
                <h3 style="color: #293920; font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">অবস্থান দেখুন</h3>
                
                <a href="https://www.google.com/maps/search/?api=1&query=1240%2F7+Kazipara+Mirpur+10+Dhaka+Bangladesh" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: #fff; padding: 12px 24px; border-radius: 50px; color: #1A73E8; font-weight: 600; font-size: 16px; text-decoration: none; width: fit-content; margin-bottom: 24px; box-shadow: 0 6px 20px rgba(0,0,0,0.06); transition: transform 0.2s ease;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none">
                        <path d="M19.8886 9.3C19.2784 9.10078 18.6405 8.99952 17.9986 9C17.0811 9.00459 16.1754 9.20812 15.3442 9.59656C14.5129 9.98501 13.7758 10.5491 13.1836 11.25L16.1836 13.74L19.8886 9.3Z" fill="#1A73E8" />
                        <path d="M13.1858 11.25C12.2242 12.3752 11.6927 13.8049 11.6858 15.285C11.677 16.3172 11.8866 17.3395 12.3008 18.285L16.1258 13.785L13.1858 11.25Z" fill="#EA4335" />
                        <path d="M17.9999 12.8702C18.3157 12.8682 18.6286 12.9289 18.9207 13.0488C19.2128 13.1687 19.4782 13.3454 19.7014 13.5687C19.9247 13.7919 20.1014 14.0573 20.2213 14.3494C20.3412 14.6415 20.4019 14.9544 20.3999 15.2702C20.3953 15.8222 20.1931 16.3544 19.8299 16.7702C19.8299 16.7702 21.7199 14.5052 23.5799 12.2702C23.2011 11.5385 22.6814 10.8888 22.0507 10.3585C21.42 9.82823 20.6908 9.42779 19.9049 9.18018L16.1699 13.6802C16.3961 13.4182 16.6775 13.2097 16.994 13.0697C17.3104 12.9296 17.654 12.8615 17.9999 12.8702Z" fill="#4285F4" />
                        <path d="M18.0007 17.685C17.685 17.687 17.372 17.6263 17.0799 17.5064C16.7878 17.3865 16.5225 17.2098 16.2992 16.9865C16.0759 16.7633 15.8992 16.4979 15.7793 16.2058C15.6594 15.9137 15.5987 15.6008 15.6007 15.285C15.604 14.7327 15.8064 14.2002 16.1707 13.785L12.3457 18.285C13.1352 19.7411 14.0917 21.1003 15.1957 22.335L19.8307 16.815C19.6097 17.0871 19.3307 17.3064 19.0141 17.4569C18.6975 17.6074 18.3513 17.6854 18.0007 17.685Z" fill="#FBBC04" />
                        <path d="M19.7384 23.85C21.8384 20.58 24.2384 19.08 24.2384 15.285C24.2401 14.2773 23.9982 13.2841 23.5334 12.39L15.1484 22.335C15.5084 22.815 15.8534 23.295 16.2134 23.835C17.4884 25.8 17.1284 26.985 17.9534 26.985C18.7784 26.985 18.4184 25.8 19.6934 23.835" fill="#34A853" />
                    </svg>
                    Open in Google Maps ↗
                </a>

                <div style="border-radius: 20px; overflow: hidden; width: 100%; min-height: 250px; flex-grow: 1; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.018634183553!2d90.36368537605657!3d23.806060778631237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0de3e6c3e9b%3A0x8a2e6b5e7c9d1234!2sKazipara%2C%20Mirpur%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1716500000000!5m2!1sen!2sbd" width="100%" height="100%" style="border: 0; display: block; width: 100%; height: 100%; min-height: 250px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="KSFL Agro Ltd. Head Office Location"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
@media screen and (max-width: 991px) {
    .premium-contact-wrapper {
        flex-direction: column !important;
        border-radius: 20px !important;
        margin-top: 30px !important;
    }
    .premium-contact-video {
        min-height: 400px !important;
    }
    .premium-contact-info {
        padding: 40px 20px !important;
    }
}
</style>
</div></div>`;

            const newContent = content.substring(0, startIndex) + newLayout + content.substring(endIndex);
            fs.writeFileSync('e:\\greenspout\\contact.html', newContent, 'utf8');
            console.log("Successfully replaced contact layout.");
        } else {
            console.error("Could not find the end of the block.");
        }
    } else {
        console.error("Could not find iframe end.");
    }
} else {
    console.error("Could not find the start marker.");
}
