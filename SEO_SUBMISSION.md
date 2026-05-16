# SEO and Search Submission Notes

Canonical site:

https://www.inpraiseoftime.site/

Sitemap URL for Google Search Console:

https://www.inpraiseoftime.site/sitemap.xml

Robots policy:

https://www.inpraiseoftime.site/robots.txt

Machine-readable overview:

https://www.inpraiseoftime.site/index.html.md

LLM/search-agent overview:

https://www.inpraiseoftime.site/llms.txt

## Google Search Console

1. Open Google Search Console.
2. Add or select the property `https://www.inpraiseoftime.site/`.
3. Verify ownership with either DNS verification or an HTML verification file.
4. Open `Indexing > Sitemaps`.
5. Submit `sitemap.xml`.
6. After deployment, use `URL Inspection` for `https://www.inpraiseoftime.site/` and request indexing.

If Search Console asks for the full sitemap URL, use:

https://www.inpraiseoftime.site/sitemap.xml

## Bing Webmaster Tools

Submit the same sitemap URL:

https://www.inpraiseoftime.site/sitemap.xml

If the Google property is verified, Bing Webmaster Tools can import the Google Search Console property. After import, submit or resubmit the sitemap and inspect the homepage.

Optional later improvement: enable IndexNow for faster Bing, Yandex, and other IndexNow partner discovery after deploys. This requires generating an IndexNow key and hosting the key file at the site root.

## Applebot / Safari / Spotlight

Applebot powers search features across Apple's ecosystem, including Safari, Spotlight, and Siri. There is no normal public submission console like Google Search Console.

Current site support:

- `robots.txt` is available at the root.
- The homepage includes index/follow directives.
- The homepage includes `applebot` meta directives.
- The canonical homepage is `https://www.inpraiseoftime.site/`.

## Baidu Search Resource Platform

Use Baidu Search Resource Platform if mainland Chinese discovery matters:

https://ziyuan.baidu.com/

Recommended steps:

1. Add the site property.
2. Verify the site with DNS, HTML file, or the Baidu-provided meta tag.
3. Submit the sitemap URL:

https://www.inpraiseoftime.site/sitemap.xml

4. Submit the homepage manually after the next deployment:

https://www.inpraiseoftime.site/

5. Monitor whether Baiduspider can fetch the page and whether the site is blocked by hosting, DNS, or regional accessibility.

Current site support:

- The homepage includes Chinese search terms: `潘岱`, `潘岱作品`, `潘岱时间档案`, `个人影像档案`, `浏览器档案`.
- The homepage includes a `baiduspider` index/follow directive.
- `robots.txt` allows crawler access to the page, text overview, LLM overview, sitemap, and metadata files.

## Sogou / 360 / Shenma / Sohu Context

For additional mainland Chinese discovery, keep the root `robots.txt` accessible and submit manually where webmaster tools are available.

Current site support:

- `robots.txt` has explicit rules for `Sogou web spider`, `Sogou inst spider`, `360Spider`, and `YisouSpider`.
- Raw media files remain excluded from standalone indexing.
- The homepage and text overview include Chinese search language around `潘岱`, `潘岱作品`, `潘岱时间档案`, `个人影像档案`, `浏览器档案`, and `人生转变 collection`.
- Sohu itself is more portal/media ecosystem than a normal public webmaster-search console; Sogou is the practical search-facing crawler connected to that Chinese web context.

Submit/check where relevant:

- Sogou Search: https://www.sogou.com/
- 360 Search: https://www.so.com/
- Shenma mobile search: https://m.sm.cn/

## Yandex Webmaster

Submit the same sitemap in Yandex Webmaster:

https://webmaster.yandex.com/

Current site support:

- The sitemap is referenced in `robots.txt`.
- The homepage includes a `yandex` index/follow directive.
- The sitemap uses XML and includes `lastmod` dates.

## DuckDuckGo, Yahoo, Ecosia, And Other Bing-Powered Results

DuckDuckGo's traditional web links are largely sourced from Bing. Yahoo and Ecosia also depend heavily on Bing. The practical route is:

1. Verify and submit the sitemap in Bing Webmaster Tools.
2. Use Bing URL Inspection on the homepage.
3. Keep `robots.txt`, sitemap, canonical URL, and homepage metadata clean.

## Japan: Google / Yahoo Japan / Japanese Search Context

Japan discovery is mostly covered through Google and Yahoo Japan search behavior, plus normal robots/sitemap discovery.

Current site support:

- The homepage includes Japanese search terms such as `個人アーカイブ` and `ブラウザアーカイブ`.
- `index.html.md` and `llms.txt` include a short Japanese search context.
- `robots.txt` explicitly allows `Slurp` for Yahoo-style crawlers while preserving raw-media restrictions.
- The sitemap is XML, UTF-8, and referenced in `robots.txt`.

Suggested Japanese snippet:

IN_PRAISE_OF_TIME は Dai Pan の 2023-2026 personal archive / 個人アーカイブです。待つこと、移動、故郷、ニューヨーク、中国北方、ブリスベン、東京、写真、映像断片、未完成のファイルを扱います。

## Korea: Naver / Daum / Korean Search Context

For Korean discovery, use Naver Search Advisor first. Daum/Kakao has less transparent public tooling, so the practical baseline is clean robots, sitemap, and Korean context in machine-readable text.

Current site support:

- `robots.txt` explicitly allows `Yeti` for Naver and `Daumoa` for Daum/Kakao while preserving raw-media restrictions.
- `index.html.md` and `llms.txt` include a short Korean search context.
- The homepage includes Korean search terms such as `개인 아카이브` and `시간 아카이브`.

Submit/check:

- Naver Search Advisor: https://searchadvisor.naver.com/

Suggested Korean snippet:

IN_PRAISE_OF_TIME은 Dai Pan의 2023-2026 personal archive / 개인 아카이브입니다. 기다림, 이동, 고향, 뉴욕, 중국 북부, 브리즈번, 도쿄, 사진, 영상 조각, 미완성 파일을 다룹니다.

## Chinese And Bilingual Search Positioning

Preferred English snippet:

IN_PRAISE_OF_TIME is Dai Pan's personal 2023-2026 browser collection about waiting, displacement, moving without arriving, hometown return, New York, northern China, Brisbane, black-and-white photography, video fragments, notes, and unfinished files.

Preferred Chinese snippet:

IN_PRAISE_OF_TIME 是潘岱关于 2023-2026 人生转变的一组 personal collection。它收集等待、迁移、没有抵达的移动、回到故乡后的陌生感、纽约窗口、北方路线、布里斯班日光、黑白摄影、视频片段、坐标和未完成文件。

## Server Notes

The project includes:

- `vercel.json` for Vercel redirects and HTTP headers.
- `_headers` for Netlify and Cloudflare Pages style static hosting.
- `robots.txt` for crawler permissions.
- `sitemap.xml` for canonical discovery.
- `index.html.md` and `llms.txt` for non-JavaScript readers, AI search, and citation context.

For Apache, translate the same rules into `.htaccess`.

For Nginx, translate them into `location` blocks.

The non-www host should permanently redirect to:

https://www.inpraiseoftime.site/
