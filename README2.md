You can keep using your GoDaddy‐registered domain and your InMotionHosting account, but you’ll need to turn your Next.js site into plain HTML/CSS/JS (so it’ll work on a traditional cPanel host) and then upload those files. Here’s the step-by-step:
1. Configure Next.js for a static export

In your next.config.js (project root), add:

/** @type {import('next').NextConfig} */
const nextConfig = {
  // tells Next.js you want to export a static site
  output: "export",
  // (optional) if you’re hosting at the root of your domain
  // you can leave basePath off; if your site lives in a subfolder
  // uncomment and set `basePath: '/your-subfolder'`
  // basePath: '',
}

module.exports = nextConfig

Then in your package.json, ensure you have:

{
  "scripts": {
    "build": "next build",
    "export": "next export",
    "start": "next start",
    "dev": "next dev"
  }
}

2. Generate the static files

From your project’s root:

npm run build
npm run export

This will create an out/ directory containing:

out/
├─ index.html
├─ enter-code.html
├─ _next/        ← your JS/CSS bundles and assets
├─ location.html
├─ schedule.html
…etc.

Those are the files your host needs.
3. Point your domain to InMotionHosting

You have two options—update Nameservers or just the A record in GoDaddy:
A) Change Nameservers (easiest)

    In your InMotionHosting account you’ll see which nameservers to use (they look like ns1.inmotionhosting.com, ns2…).

    In GoDaddy’s Domain Manager, edit your domain’s Nameservers to those.

    Wait up to 48 hours for DNS propagation (usually much faster).

B) Keep GoDaddy’s nameservers, set an A record

    In GoDaddy’s DNS settings for your domain, add/edit the A record for @ pointing to your InMotionHosting server’s IP address (you get this in your InMotionHosting control panel).

    Also add a CNAME for www pointing to @ (so www.yourdomain.com works).

4. Upload your out/ directory to InMotionHosting

    Log into cPanel (InMotionHosting control panel).

    Open File Manager → go into the public_html/ folder (that’s your web root).

    Delete any placeholder files (e.g. index.html) if present.

    Click Upload, select all the contents of your local out/ folder (not the folder itself—its contents).

    Once uploaded, your site will be live at https://yourdomain.com.

    Tip: You can also use an FTP/SFTP client (FileZilla, Cyberduck) with the FTP credentials from your hosting panel to drag-and-drop the files.

5. Verify

    Visit https://yourdomain.com in a browser.

    You should see your “Enter Passcode” landing page (if you kept that route).

    Navigate through your one-page site—Location, Schedule, About Spetses, RSVP—and confirm everything works.

Summary

    Build & export your Next.js as static: npm run build && npm run export → creates out/.

    Point DNS (nameservers or A-record) from GoDaddy to InMotionHosting.

    Upload out/ contents into public_html/ via cPanel or FTP.

    Enjoy your live wedding site at your custom domain!

Let me know if you run into any DNS delays or upload hiccups!