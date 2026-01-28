import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nextjsstarter.io";

export const SOURCE_CODE_URL = "https://github.com/weijunext/nextjs-starter";
export const PRO_VERSION = "https://nexty.dev";

const TWITTER_URL = 'https://x.com/weijunext'
const BSKY_URL = 'https://bsky.app/profile/judewei.bsky.social'
const EMAIL_URL = 'weijunext@gmail.com'
const GITHUB_URL = 'https://github.com/weijunext'
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL

export const siteConfig: SiteConfig = {
  name: "DnA Solutions",
  tagLine: 'AI and Data Solutions',
  description:
    "We are a team of AI and data experts from CMC Corporation who are passionate about helping businesses leverage the power of AI and data to achieve their goals.",
  url: BASE_URL,
  authors: [
    {
      name: "DnA Solutions",
      url: "https://cmcconsulting.com",
    }
  ],
  creator: '@chinhpham',
  socialLinks: {
    github: GITHUB_URL,
    email: EMAIL_URL
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'system', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // apple-touch-icon.png
  },
}
