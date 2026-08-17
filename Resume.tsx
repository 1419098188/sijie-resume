import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS = [
  {
    id: 'douyin',
    label: '抖音',
    href: 'https://www.douyin.com/user/MS4wLjABAAAAlmQDgHf0NlbsjrfWENm8LyrIikxSRRq7mzlzQSIStQJkV7Ju52B6A55zw5TUDU5d',
  },
  {
    id: 'bilibili',
    label: 'B站',
    href: 'https://space.bilibili.com/275344092?spm_id_from=333.937.0.0',
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/5ceba8c8000000000502fd69',
  },
]

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2013 – 2017',
        place: 'Sun Yat-sen University',
        role: 'B.S. in Software Engineering',
      },
      {
        period: '2017 – 2020',
        place: 'HOTSAR Studio · Shanghai',
        role: 'Co-founder',
        logo: { src: `${import.meta.env.BASE_URL}images/hotsar.jpg`, alt: 'HOTSAR' },
        points: [
          'Co-founder · team of 20+',
          'Clients: Alibaba brands, Tencent, NetEase, DiDi, China Resources, McDonald’s…',
          'Work: development / creative direction / animation / team management',
        ],
      },
      {
        period: '2020 – 2025',
        place: 'Bad Printer Studio · Shenzhen',
        role: 'Founder',
        logo: { src: `${import.meta.env.BASE_URL}images/bp.png`, alt: 'Bad Printer Studio' },
        points: [
          'Founder · team of 14',
          'Clients: Honor of Kings / Trip.com / ByteDance / Kuaishou / VIVO / Tecno / Xiaomi / IM Motors…',
          'Work: team management / creative direction / animation / development',
        ],
      },
      {
        period: '2025 – Now',
        place: 'Content Creator',
        groups: [
          {
            heading: '小郑还挺忙',
            logoImg: `${import.meta.env.BASE_URL}images/buzyzheng.png`,
            sub: 'tech-DIY creator',
            items: ['120K on Douyin · 87K on Bilibili · 23K on Xiaohongshu'],
            links: SOCIAL_LINKS,
          },
        ],
      },
      {
        period: '2026 – Now',
        place: 'Indie Developer',
        groups: [{ logo: 'zooop', sub: 'AI creation platform', link: 'https://zooop.ai/' }],
      },
    ],
  },
  zh: {
    title: 'Résumé',
        entries: [
      {
        period: '2022 – 2026',
        place: '多伦多大学 · University of Toronto',
        role: '数学与物理双主修 · 本科',
        points: [
          'QS排名25，加拿大排名第1',
          '主修课程：Python & Java、线性代数、高等数学、经典力学、天体物理、热力学、量子力学、概率论',
          '掌握纯数学与应用数学理论，具备完整实验流程能力（方案设计→仪器操作→数据收集→误差评估→结论总结）',
        ],
      },
      {
        period: '2024 – 2025',
        place: '乔治布朗学院 · George Brown College',
        role: '媒体基础项目',
        points: [
          '主修：多媒体入门、视频制作、摄影入门、场面调度、电影结构',
          '具备摄影拍摄、光影把控及图片后期修图能力',
          '掌握短视频拍摄、内容构思、现场调度、镜头运用和视频编辑',
        ],
      },
      {
        period: '2021 – 2022',
        place: '多伦多大学 IFP 预科项目',
        role: 'International Foundation Program',
        points: [
          '帮助国际学生解决大学过渡、语言学习和文化融入的预备课程',
          '完成从国内教育体系到北美大学的平稳过渡',
        ],
      },
      {
        period: '2018 – 2021',
        place: '加拿大高中',
        role: '3年本地高中',
        points: [
          '国内九年义务教育 + 加拿大8年留学经历（3年高中 + 5年大学）',
          '熟练运用中英双语，深度理解中西方文化差异与思维模式',
          '锻炼了自主学习、时间管理与跨文化交流能力',
        ],
      },
      {
        period: '至今',
        place: '特长与竞技',
        role: '羽毛球 · 竞技游戏',
        points: [
          '羽毛球系统训练，可对抗大部分业余选手',
          '深耕竞技性游戏，实力抗衡半职业选手',
          '竞技经历练就稳定心态、出色抗压能力与临场应变能力',
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
