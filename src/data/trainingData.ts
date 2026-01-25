import { TrainingMenu, WeeklyMenus } from '../types';

/**
 * サンプルトレーニングメニューデータ
 */
export const initialTrainingMenus: WeeklyMenus = {
  月: [
    {
      name: 'ハムストリングストレッチ',
      emoji: '🦵',
      reps: 30,
      sets: 3,
      unit: '秒',
      image: '/images/hamstring-stretch.png'
    },
    {
      name: '体側伸ばし',
      emoji: '🤸',
      reps: 45,
      sets: 2,
      unit: '秒',
      image: '/images/seated-trunk-side-bend.png'
    }
  ],
  火: [
    {
      name: '腕立て伏せ',
      emoji: '💪',
      reps: 10,
      sets: 3,
      unit: '回',
      image: '/images/push-up.png'
    }
  ],
  水: [
    {
      name: 'プランク',
      emoji: '🏋️',
      reps: 30,
      sets: 3,
      unit: '秒',
      image: '/images/plank.png'
    }
  ],
  木: [
    {
      name: 'スクワット',
      emoji: '🦵',
      reps: 15,
      sets: 3,
      unit: '回',
      image: '/images/squat.png'
    }
  ],
  金: [
    {
      name: 'ランジ',
      emoji: '🦵',
      reps: 15,
      sets: 3,
      unit: '回',
      image: '/images/lunge.png'
    }
  ],
  土: [],
  日: []
};

/**
 * トレーニングメニューのテンプレート（カスタマイズ用）
 */
export const menuTemplates: TrainingMenu[] = [
  {
    name: 'アキレス腱ストレッチ',
    emoji: '🦵',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/achilles-tendon-stretch.png'
  },
  {
    name: 'バードドッグ',
    emoji: '🐦',
    reps: 20,
    sets: 3,
    unit: '回',
    category: '体幹',
    image: '/images/bird-dog.png'
  },
  {
    name: 'カーフレイズ',
    emoji: '🦵',
    reps: 20,
    sets: 3,
    unit: '回',
    category: '下半身',
    image: '/images/calf-raise.png'
  },
  {
    name: 'キャットカウ',
    emoji: '🐱',
    reps: 15,
    sets: 2,
    unit: '回',
    category: 'ストレッチ',
    image: '/images/cat-cow.png'
  },
  {
    name: 'サイクリング',
    emoji: '🚴',
    reps: 10,
    sets: 1,
    unit: '分',
    category: '有酸素',
    image: '/images/cycling.png'
  },
  {
    name: 'エルゴメーター',
    emoji: '🚣',
    reps: 10,
    sets: 1,
    unit: '分',
    category: '有酸素',
    image: '/images/ergometer.png'
  },
  {
    name: 'お尻ストレッチ',
    emoji: '🍑',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/glute-stretch.png'
  },
  {
    name: 'ハムストリングストレッチ',
    emoji: '🦵',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/hamstring-stretch.png'
  },
  {
    name: '膝抱えストレッチ',
    emoji: '🤗',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/knee-hug-stretch.png'
  },
  {
    name: 'ランジ',
    emoji: '🦵',
    reps: 15,
    sets: 3,
    unit: '回',
    category: '下半身',
    image: '/images/lunge.png'
  },
  {
    name: '胸ストレッチ',
    emoji: '💪',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/pec-stretch.png'
  },
  {
    name: 'プランク',
    emoji: '🏋️',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: '体幹',
    image: '/images/plank.png'
  },
  {
    name: '腕立て伏せ',
    emoji: '💪',
    reps: 10,
    sets: 3,
    unit: '回',
    category: '筋トレ',
    image: '/images/push-up.png'
  },
  {
    name: 'ランニング',
    emoji: '🏃',
    reps: 15,
    sets: 1,
    unit: '分',
    category: '有酸素',
    image: '/images/running.png'
  },
  {
    name: '座位お尻ストレッチ',
    emoji: '🪑',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/seated-glute-stretch.png'
  },
  {
    name: 'シーテッドロウ',
    emoji: '🚣',
    reps: 15,
    sets: 3,
    unit: '回',
    category: '背中',
    image: '/images/seated-row.png'
  },
  {
    name: '体側伸ばし',
    emoji: '🤸',
    reps: 30,
    sets: 3,
    unit: '秒',
    category: 'ストレッチ',
    image: '/images/seated-trunk-side-bend.png'
  },
  {
    name: '縄跳び',
    emoji: '🪢',
    reps: 100,
    sets: 3,
    unit: '回',
    category: '有酸素',
    image: '/images/skipping-rope.png'
  },
  {
    name: 'スクワット',
    emoji: '🦵',
    reps: 15,
    sets: 3,
    unit: '回',
    category: '下半身',
    image: '/images/squat.png'
  },
  {
    name: '脊柱ツイスト',
    emoji: '🌀',
    reps: 15,
    sets: 3,
    unit: '回',
    category: 'ストレッチ',
    image: '/images/supine-spinal-twist.png'
  },
  {
    name: 'トランクカール',
    emoji: '💪',
    reps: 20,
    sets: 3,
    unit: '回',
    category: '体幹',
    image: '/images/trunk-curl.png'
  },
  {
    name: 'ウォーキング',
    emoji: '🚶',
    reps: 20,
    sets: 1,
    unit: '分',
    category: '有酸素',
    image: '/images/walking.png'
  }
];
