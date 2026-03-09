/**
 * テンプレート定義
 * 非エンジニア向け：項目名は日本語で分かりやすく
 */
const TEMPLATES = [
  {
    id: 'simple',
    name: 'シンプル',
    description: 'テキスト中心のすっきりしたデザイン。自己紹介やお知らせに。',
    fields: [
      { key: 'siteTitle', label: 'サイトのタイトル', type: 'text', placeholder: '例：〇〇のホームページ' },
      { key: 'catchphrase', label: 'キャッチコピー（一言）', type: 'text', placeholder: '例：ようこそ、〇〇へ' },
      { key: 'mainText', label: '本文', type: 'textarea', placeholder: 'ここにメインの文章を書いてください。改行はそのまま反映されます。' },
      { key: 'contactLabel', label: 'お問い合わせの見出し', type: 'text', placeholder: '例：お問い合わせ' },
      { key: 'contactText', label: '連絡先・メールなど', type: 'textarea', placeholder: 'メールアドレスや電話番号を書いてください。' }
    ],
    cssClass: 'template-simple'
  },
  {
    id: 'business',
    name: '店舗・ビジネス',
    description: '店舗やサービス紹介に。営業時間・アクセスを載せたい方に。',
    fields: [
      { key: 'siteTitle', label: '店舗・サービス名', type: 'text', placeholder: '例：〇〇カフェ' },
      { key: 'catchphrase', label: 'キャッチコピー', type: 'text', placeholder: '例：心が温まる一杯を' },
      { key: 'aboutTitle', label: '「私たちについて」の見出し', type: 'text', placeholder: '例：〇〇について' },
      { key: 'aboutText', label: '紹介文', type: 'textarea', placeholder: '店舗やサービスの説明を書いてください。' },
      { key: 'hoursTitle', label: '営業時間の見出し', type: 'text', placeholder: '例：営業時間' },
      { key: 'hoursText', label: '営業時間', type: 'textarea', placeholder: '例：平日 10:00〜18:00' },
      { key: 'accessTitle', label: 'アクセスの見出し', type: 'text', placeholder: '例：アクセス' },
      { key: 'accessText', label: '住所・アクセス', type: 'textarea', placeholder: '住所や最寄り駅を書いてください。' },
      { key: 'contactLabel', label: 'お問い合わせの見出し', type: 'text', placeholder: '例：お問い合わせ' },
      { key: 'contactText', label: '電話・メールなど', type: 'textarea', placeholder: '連絡先を書いてください。' }
    ],
    cssClass: 'template-business'
  },
  {
    id: 'profile',
    name: '自己紹介・ポートフォリオ',
    description: '自分を紹介するページ。経歴やSNSリンクに。',
    fields: [
      { key: 'siteTitle', label: 'あなたの名前（サイトタイトル）', type: 'text', placeholder: '例：山田 太郎' },
      { key: 'catchphrase', label: '一言コピー', type: 'text', placeholder: '例：デザイナー / 〇〇が得意' },
      { key: 'profileTitle', label: 'プロフィールの見出し', type: 'text', placeholder: '例：プロフィール' },
      { key: 'profileText', label: '自己紹介文', type: 'textarea', placeholder: '経歴や得意なこと、趣味などを書いてください。' },
      { key: 'linkTitle', label: 'リンクの見出し', type: 'text', placeholder: '例：リンク' },
      { key: 'linkText', label: 'SNSやブログのURL（1行に1つ）', type: 'textarea', placeholder: 'https://twitter.com/...\nhttps://...' },
      { key: 'contactLabel', label: 'お問い合わせの見出し', type: 'text', placeholder: '例：お問い合わせ' },
      { key: 'contactText', label: 'メールなど', type: 'textarea', placeholder: '連絡先を書いてください。' }
    ],
    cssClass: 'template-profile'
  }
];
