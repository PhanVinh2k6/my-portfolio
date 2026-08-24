# Deploy portfolio lên Vercel

Tài liệu này mô tả cách deploy repository `PhanVinh2k6/my-portfolio` lên Vercel, bật Google Analytics 4 và kiểm tra social preview. Vercel có thể kết nối GitHub để tự động tạo Preview Deployment cho các branch/PR và cập nhật Production Deployment khi push vào production branch.[1]

## 1. Import repository

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard).
2. Chọn **Add New → Project**.
3. Kết nối GitHub nếu Vercel chưa được cấp quyền, sau đó chọn `PhanVinh2k6/my-portfolio`.
4. Giữ framework preset là **Next.js**.
5. Giữ các giá trị mặc định cho Root Directory, Install Command và Build Command. Project này dùng `npm install`/`npm ci`, `npm run build` và `npm start` khi chạy production.
6. Chọn **Deploy**. Sau khi deploy, Vercel sẽ cấp một URL `.vercel.app` để kiểm tra preview.

## 2. Cấu hình Google Analytics 4

1. Vào [Google Analytics](https://analytics.google.com/) và tạo hoặc mở một GA4 Web data stream.
2. Copy **Measurement ID**, có dạng `G-XXXXXXXXXX`.
3. Trong Vercel, mở project → **Settings → Environment Variables**.
4. Tạo biến:

```text
Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
Environments: Production, Preview (tuỳ nhu cầu)
```

Vercel tách environment variables theo Production, Preview và Development; thay đổi biến chỉ áp dụng cho các deployment mới, vì vậy cần redeploy sau khi lưu.[2]

5. Mở **Deployments → Redeploy** deployment production gần nhất, hoặc push một commit mới.
6. Kiểm tra trong trình duyệt bằng DevTools Network hoặc Google Analytics Realtime. Script chỉ xuất hiện khi `NEXT_PUBLIC_GA_ID` có giá trị; local build không có biến này sẽ không gửi tracking request.

Để chạy local:

```bash
cp .env.example .env.local
# điền NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX vào .env.local
npm run dev
```

Không commit `.env.local` hoặc Measurement ID cùng secret khác vào Git. Measurement ID bản thân nó không phải secret, nhưng nên cấu hình qua environment để tách khỏi source và dễ đổi theo environment.

## 3. Gắn custom domain

1. Vào project trên Vercel → **Settings → Domains**.
2. Chọn **Add Domain** và nhập `phanvinh.id.vn`.
3. Làm theo DNS record mà dashboard hiển thị. Apex domain thường dùng A record; subdomain thường dùng CNAME record.[3]
4. Chờ Vercel verify domain và cấp HTTPS.
5. Sau khi domain hoạt động, kiểm tra các URL:

```text
https://phanvinh.id.vn/
https://phanvinh.id.vn/blog
https://phanvinh.id.vn/sitemap.xml
https://phanvinh.id.vn/robots.txt
https://phanvinh.id.vn/opengraph-image
https://phanvinh.id.vn/twitter-image
```

Metadata hiện dùng canonical origin `https://phanvinh.id.vn`. Nếu deploy bằng domain khác, cần cập nhật `siteUrl` trong `app/layout.tsx`, `app/robots.ts` và `app/sitemap.ts` trước khi production index domain mới.

## 4. Kiểm tra SEO và social preview

Sau deploy, dùng các công cụ sau để kiểm tra:

| Hạng mục | Cách kiểm tra |
|---|---|
| SEO metadata | Xem HTML source hoặc chạy Lighthouse trên homepage, `/blog` và một project detail |
| Open Graph | Dùng [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| LinkedIn preview | Dùng [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) |
| Twitter/X card | Dùng [Card Validator](https://cards-dev.twitter.com/validator) nếu còn khả dụng trên tài khoản |
| Sitemap | Mở `/sitemap.xml`, sau đó submit trong Google Search Console |
| Robots | Mở `/robots.txt` và xác nhận sitemap trỏ đúng domain |

## 5. Security checklist trước production

Repository là static-first và không có API xử lý dữ liệu người dùng. `next.config.ts` đã thêm các header phòng thủ gồm Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, Referrer Policy, Permissions Policy, HSTS và tắt powered-by header.

Không nên tự phát sinh DDoS/DoS traffic trên production. Với website tĩnh, hãy dùng Vercel CDN/edge protection, giới hạn quyền deploy, bật Git fork protection và theo dõi deployment logs. Kiểm tra an toàn nên tập trung vào dependency audit, headers, input handling, crawlability, CSP và các route 404 trên preview environment.

## References

[1]: https://vercel.com/docs/git/vercel-for-github "Deploying GitHub Projects with Vercel"
[2]: https://vercel.com/docs/environment-variables "Vercel Environment Variables"
[3]: https://vercel.com/docs/domains/working-with-domains/add-a-domain "Adding & Configuring a Custom Domain"
