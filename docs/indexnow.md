# IndexNow

After a successful main-branch GitHub Pages deployment, the IndexNow job compares the deployed build's canonical sitemap HTML fingerprints with the last accepted manifest kept in a GitHub Actions artifact. The initial deployment (or an expired baseline) submits the current sitemap URLs; subsequent runs submit only new, changed, or removed URLs. A page removed from the sitemap is notified once if it was previously tracked. Private runners and legacy URLs are not seeded. A failed notification leaves the previous baseline intact; rerun the failed job or let the next deployment retry the changes. No submission is made for identical builds.

The root key file is public ownership proof, not a GitHub credential. The workflow checks it on the live host before sending anything. If changing host or key, publish the new matching file and update scripts/indexnow.mjs. Do not manually resubmit the sitemap URLs after routine releases.

HTTP 200 means received; HTTP 202 means key validation is pending. Neither guarantees crawling or indexing. Check the IndexNow job logs and Bing Webmaster Tools for submission activity. Keep the existing sitemap and Google Search Console setup: this workflow does not submit URLs to Google. See https://www.indexnow.org/documentation and https://www.bing.com/webmasters/help/URL-Submission-62f2860b.
