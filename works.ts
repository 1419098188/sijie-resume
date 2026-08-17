// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'academic',
        no: '01',
        title: '学术项目',
        tagline: '数学与物理',
        items: [
          { name: '量子力学课题研究', meta: '理论推导', slug: 'quantum' },
          { name: '天体物理数据分析', meta: 'Python 数据处理', slug: 'astro' },
          { name: '经典力学实验报告', meta: '完整实验流程', slug: 'mechanics' },
          { name: '概率论与统计建模', meta: '数学建模', slug: 'stats' },
        ],
      },
      {
        id: 'media',
        no: '02',
        title: '媒体创作',
        tagline: '摄影 · 视频 · 后期',
        items: [
          { name: '摄影作品集', meta: '光影把控 · 后期修图', slug: 'photography' },
          { name: '短视频制作', meta: '拍摄 · 剪辑 · 调色', slug: 'short-video' },
          { name: '场面调度练习', meta: '电影结构 · 镜头运用', slug: 'filmmaking' },
        ],
        footer: '摄影拍摄 · 光影把控 · 图片后期 · 视频剪辑 · 现场调度',
      },
      {
        id: 'skills',
        no: '03',
        title: '技能与特长',
        tagline: '语言 · 运动 · 竞技',
        items: [
          { name: '中英双语', meta: '8年加拿大留学', slug: 'language' },
          { name: '羽毛球', meta: '系统训练 · 对抗业余选手', slug: 'badminton' },
          { name: '竞技游戏', meta: '半职业水平', slug: 'gaming' },
        ],
      },
      {
        id: 'about',
        no: '04',
        title: '关于我',
        tagline: '个人经历',
        items: [
          { name: '8年加拿大留学', meta: '3年高中 + 5年大学', slug: 'study' },
          { name: '跨文化交流', meta: '中西方思维融合', slug: 'culture' },
          { name: '自主学习与时间管理', meta: '海外独立求学', slug: 'independence' },
        ],
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'ad',
        no: '01',
        title: 'Advertising',
        tagline: 'HOTSAR · Bad Printer',
        items: [
          { name: 'Who’s Talking About Guqin', meta: 'Interactive', slug: 'guqin' },
          { name: 'Lianhe Zaobao · Campus Time Machine', meta: 'Interactive', slug: 'time-machine' },
          { name: 'Animation Reel', meta: 'Animation', slug: 'animation-collection' },
          { name: 'Other works', slug: 'other-works' },
        ],
        awards: ['Tiger Roar', 'FWA', 'Awwwards'],
      },
      {
        id: 'maker',
        no: '02',
        title: 'Content Creator',
        tagline: '230K followers',
        items: [
          {
            name: '“I Turned the Studio’s Glass Wall into a Game Console”',
            meta: '17M views',
            tags: ['Bilibili Weekly Picks', 'Bilibili Trending'],
            slug: 'glass-wall-arcade',
          },
          {
            name: '“I Wrote Code into My Dog’s Clothes”',
            meta: '9M views',
            tags: ['Trending on Weibo / Douyin / Bilibili'],
            slug: 'dog-code-clothes',
          },
          {
            name: '“I Made a 10× Switch into a Smart Cat House”',
            meta: '5M views',
            tags: ['Bilibili Weekly Picks'],
            slug: 'switch-cat-house',
          },
          { name: '“We Got Married in an 80s Famicom Game!!”', slug: 'retro-game-wedding' },
        ],
        footer: 'Tech: 3D modeling · 3D printing · PCB design · embedded · software · motion graphics',
      },
      {
        id: 'product',
        no: '03',
        title: 'Products',
        tagline: 'ZOOOP',
        items: [
          { name: 'ZOOOP', meta: 'AI-native creation platform', link: 'https://zooop.ai/', slug: 'zooop' },
        ],
      },
      {
        id: 'graphics',
        no: '04',
        title: 'Side Projects',
        tagline: 'Raymarching · WebGL · Blender',
        items: [
          { name: 'Raymarching', slug: 'raymarching' },
          { name: 'WebGL', slug: 'webgl' },
          { name: 'Blender', slug: 'blender' },
          { name: 'Other side projects', slug: 'other-side-works' },
        ],
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  ad: `${import.meta.env.BASE_URL}works/covers/ad.jpg`,
  maker: `${import.meta.env.BASE_URL}works/covers/maker.jpg`,
  product: `${import.meta.env.BASE_URL}works/covers/product.jpg`,
  graphics: `${import.meta.env.BASE_URL}works/covers/graphics.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
