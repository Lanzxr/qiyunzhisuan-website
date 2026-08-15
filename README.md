# 启云智算官网

中山市启云智算信息技术有限责任公司的静态官网，适合部署至 GitHub Pages。

## 页面与语言

网站只有一个入口：`index.html`。

页面内置简体中文、繁体中文（台湾措辞）、繁体中文（香港措辞）和英语文案。语言按钮在当前页面切换内容，不加载另一个页面，也不需要四次部署。切换后地址会更新为 `?lang=zh-TW`、`?lang=zh-HK` 或 `?lang=en`，便于分享同一种语言状态。

网站使用静态 HTML、CSS 和 JavaScript，不依赖后端、数据库或构建工具。

## GitHub Pages 发布

1. 将本目录推送至 GitHub 仓库。
2. 打开仓库的 `Settings`，进入 `Pages`。
3. 在 `Build and deployment` 中选择 `GitHub Actions`。
4. 推送到 `main` 或 `master` 分支后，`.github/workflows/deploy-pages.yml` 会自动发布网站。工作流只会将 `index.html`、`assets/` 和 `robots.txt` 打包为 Pages 制品；技术维护文档和临时图片不会进入公开网站。
5. GitHub Actions 完成后，在仓库 `Settings > Pages` 查看公开网址。

自定义域名尚未确定。确认域名后，在 GitHub Pages 设置中绑定域名并完成 DNS 配置。HTTPS 由 GitHub Pages 提供，但必须等待域名验证和证书签发完成。

GitHub Pages 的公开内容与 GitHub 仓库源码的可见性是两回事：本工作流已经阻止非网站文件出现在 Pages 域名下；仓库内文件是否可被浏览，仍取决于仓库设置为公开或私有。`tmp/` 已由 `.gitignore` 排除，避免把首图候选文件提交到仓库。

## Meta/Facebook 域名验证

在根目录 `index.html` 的 `<head>` 内有以下占位标签：

```html
<meta name="facebook-domain-verification" content="REPLACE_WITH_META_TOKEN">
```

从 Meta Business Manager 获取 token 后，替换 `REPLACE_WITH_META_TOKEN` 的内容并重新发布即可。当前未取得 token 时保留占位值不会完成验证，也不会影响普通页面访问。

当前发布白名单只包含官网所需文件，因此建议使用此 Meta 标签验证方式。若未来改用 Meta 提供的根目录 HTML 验证文件，需先在工作流的“Prepare public site artifact”步骤中显式复制该文件，再发布。

只有控制域名 DNS 或网站发布权限的账号才能完成最终验证。网站提供验证入口，但不能保证 Meta 的审核结果。

## 仍待确认的公开资料

- 自定义域名及 DNS 管理方式
- 公司英文正式名称
- 对外联系电话
- Logo、品牌色与公司照片
- 是否展示营业执照图片
- 隐私政策的法务审核（当前版本按静态网站实际行为编写）

## 图片来源

本项目使用以下本地化的 Unsplash 摄影作为通用技术主题素材：

- `assets/images/hero-technology-background.jpg`：用户提供的 Unsplash 图片链接（已下载为本地背景图）
- `assets/images/workstation-development.jpg`：https://unsplash.com/photos/80022131f5a1

正式发布前建议用公司自有、已授权的办公、团队或项目图片替换。
