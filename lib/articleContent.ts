// Full article content — rich structured data for rendered article pages

export interface ArticleSection {
  type: 'intro' | 'h2' | 'h3' | 'body' | 'callout' | 'exercise-table' | 'progression-block' | 'tip-box' | 'image' | 'quote' | 'divider'
  content?: string
  label?: string        // for callout / tip-box labels
  accent?: string       // color override
  exercises?: ExerciseRow[]
  progressions?: ProgressionLevel[]
  src?: string          // for image
  alt?: string
  cite?: string         // for quote attribution
}

export interface ExerciseRow {
  name: string
  sets: string
  reps: string
  rest: string
  cue: string
}

export interface ProgressionLevel {
  level: number
  name: string
  description: string
  targetReps: string
  indicator: string   // when you're ready to progress
}

export interface FullArticle {
  slug: string
  title: string
  subtitle: string
  author: string
  authorRole: string
  date: string
  readTime: string
  tag: string
  heroImage: string
  sections: ArticleSection[]
}

export const FULL_ARTICLES: Record<string, FullArticle> = {
  'push-up-progressions': {
    slug: 'push-up-progressions',
    title: 'The Complete Push-Up Progression',
    subtitle: 'From Zero to One-Arm — A Step-by-Step System for Building Elite Upper-Body Strength',
    author: 'Sarah Okafor',
    authorRole: 'CSCS · Strength & Conditioning Specialist',
    date: 'February 14, 2026',
    readTime: '12 min read',
    tag: 'Training Guide',
    heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=85&fit=crop',
    sections: [
      {
        type: 'intro',
        content: `The push-up is the most underestimated exercise in existence. Most people either can't do one properly, or they knock out fifty sloppy reps and wonder why they're not getting stronger. The truth is that the push-up is a complete upper-body strength system — and there's a version of it for every level from absolute beginner to elite calisthenics athlete.

This guide lays out the complete progression ladder: 9 levels, precise standards, and the exact cues that separate a productive push-up from a wasted one. Work through it in sequence and you'll build more pressing strength than most people develop in years of bench pressing.`,
      },
      {
        type: 'callout',
        label: 'Why Push-Ups Over Bench Press?',
        content: `The push-up trains your serratus anterior — the muscle that wraps your ribcage and keeps your shoulder blade flush against your back. Every bench press athlete eventually develops shoulder pain from ignoring this muscle. Push-ups train it by default. That's not a side benefit. That's a superpower.`,
        accent: '#e8521a',
      },
      {
        type: 'h2',
        content: 'Before You Start: The Perfect Rep',
      },
      {
        type: 'body',
        content: `Every level of this progression uses the same fundamental technique. Get this wired first and every rep you do will compound. Shortcuts here cost you later.`,
      },
      {
        type: 'exercise-table',
        exercises: [
          { name: 'Hand Position', sets: '—', reps: '—', rest: '—', cue: 'Directly under shoulders, fingers spread. Slight external rotation (think: try to screw hands into the floor).' },
          { name: 'Body Line', sets: '—', reps: '—', rest: '—', cue: 'Head, hips, heels — one rigid plank. No sagging hips, no raised butt. Squeeze glutes and abs the entire time.' },
          { name: 'Elbows', sets: '—', reps: '—', rest: '—', cue: '45° angle to your torso — not flared out, not glued to your sides. Think arrowhead, not T-shape.' },
          { name: 'Range', sets: '—', reps: '—', rest: '—', cue: 'Chest touches the floor at the bottom. Full lockout at the top. No half reps — ever.' },
          { name: 'Neck', sets: '—', reps: '—', rest: '—', cue: 'Neutral. Eyes focused 6 inches in front of your hands. Not at the floor, not at the ceiling.' },
        ],
      },
      {
        type: 'h2',
        content: 'The 9-Level Progression',
      },
      {
        type: 'body',
        content: `Each level has a clear "unlock standard" — the minimum reps you need to hit before advancing. Don't rush. Hitting 3×10 clean at Level 3 before moving to Level 4 isn't being cautious. It's what actually builds strength.`,
      },
      {
        type: 'progression-block',
        progressions: [
          {
            level: 1,
            name: 'Wall Push-Up',
            description: 'Standing arm\'s length from a wall, hands at chest height. Same body alignment rules apply. This is not for beginners only — it\'s an excellent warm-up for advanced athletes.',
            targetReps: '3 × 15 with a 2-second pause at the bottom',
            indicator: 'Move to Level 2 when 3×15 feels completely effortless and your body line is perfect.',
          },
          {
            level: 2,
            name: 'Incline Push-Up',
            description: 'Hands elevated on a bench, chair, or countertop (30–45° incline). The higher the surface, the easier the rep. Start high and work your way lower over weeks.',
            targetReps: '3 × 12 at a low incline (chair height)',
            indicator: 'Move to Level 3 when you can do 3×12 at knee height with a 2s descent.',
          },
          {
            level: 3,
            name: 'Knee Push-Up',
            description: 'Knees on floor, hips extended — NOT bent. The mistake everyone makes: hinging at the hip. Your body from knee to crown should be a straight line.',
            targetReps: '3 × 12 with full range and rigid body line',
            indicator: 'Move to Level 4 when you can do 3×12 without any hip sag or rush.',
          },
          {
            level: 4,
            name: 'Full Push-Up',
            description: 'The standard. Every cue from the technique section applied here. If your hips sag or you can\'t touch chest to floor, drop back to Level 3 until strength catches up.',
            targetReps: '3 × 10 with chest to floor and 2-second descent',
            indicator: 'Move to Level 5 when you can do 3×10 clean with 60s rest between sets.',
          },
          {
            level: 5,
            name: 'Diamond Push-Up',
            description: 'Hands form a diamond shape under your sternum, index fingers and thumbs touching. Extreme tricep and medial chest emphasis. Elbows stay close — they should graze your sides on the way down.',
            targetReps: '3 × 8 with clean form',
            indicator: 'Move to Level 6 when you can do 3×8 without any elbow flare.',
          },
          {
            level: 6,
            name: 'Archer Push-Up',
            description: 'One arm extends straight to the side while the other bends to lower you. The straight arm acts as a counterbalance and gets a serious stretch. You shift your weight toward the bending arm.',
            targetReps: '3 × 6 each side',
            indicator: 'Move to Level 7 when the straight arm barely needs to assist. If it\'s gripping the floor hard, you\'re not ready.',
          },
          {
            level: 7,
            name: 'Pseudo Planche Push-Up',
            description: 'Hands turned backward (fingers pointing toward your feet), placed beside your hips rather than your shoulders. This forces your center of gravity forward and hammers your front delts and serratus. Start easy and move hands progressively lower over weeks.',
            targetReps: '3 × 8 with hands at hip level',
            indicator: 'Move to Level 8 when you can do 3×8 with hands at thigh level.',
          },
          {
            level: 8,
            name: 'One-Arm Negative',
            description: 'Full one-arm descent over 4–5 seconds, then catch yourself with both hands to reset. This is the bridge to the full one-arm push-up. One side at a time. 3–4 days between sessions.',
            targetReps: '5 × 3 each arm with a 5-second descent',
            indicator: 'Move to Level 9 when you can lower to chest level with complete control — no crashing.',
          },
          {
            level: 9,
            name: 'One-Arm Push-Up',
            description: 'The top of the mountain. Feet slightly wider than usual for balance. Non-working hand on your lower back or hip — not on your knee (cheating). Rotate through your torso slightly, but keep hips square. One clean rep is a genuine achievement.',
            targetReps: '3 × 3 each arm, full range',
            indicator: 'You\'ve arrived. Work toward 3×5, then test yourself under fatigue.',
          },
        ],
      },
      {
        type: 'h2',
        content: 'How to Program This',
      },
      {
        type: 'body',
        content: `Don't treat the progression as a checklist to rush through. Here's how to actually integrate it into a training week:`,
      },
      {
        type: 'tip-box',
        label: 'THE FREQUENCY RULE',
        content: `Push-ups (like all pressing movements) need 48 hours of recovery between sessions. For most people, 3 days per week is the sweet spot — Monday, Wednesday, Friday. Advanced athletes can push to 4 days by adding a technique-only "feeder" session with 50% volume.`,
        accent: '#f2c94c',
      },
      {
        type: 'exercise-table',
        exercises: [
          { name: 'Monday', sets: '4', reps: 'Current level, max clean reps', rest: '90s', cue: 'Leave 2 reps in the tank every set. Stop before form breaks.' },
          { name: 'Wednesday', sets: '3', reps: '60% of Monday\'s reps', rest: '60s', cue: 'Technique day. Slow the descent to 3 seconds. Perfect every rep.' },
          { name: 'Friday', sets: '5', reps: 'As many clean reps as possible', rest: '2min', cue: 'Volume day. Push the last set. This is where PRs happen.' },
        ],
      },
      {
        type: 'h2',
        content: 'Why Most People Stall at Level 4',
      },
      {
        type: 'body',
        content: `The jump from Level 4 (full push-up) to Level 5 (diamond) is where 80% of people get stuck for months. It's not a strength issue — it's a tricep development gap. Here's the fix:`,
      },
      {
        type: 'tip-box',
        label: 'TRICEP BRIDGE PROTOCOL',
        content: `Add 3 sets of tricep dips (bench or chair) to every session for 4 weeks. You don't need a dip bar — the edge of your sofa works perfectly. This directly addresses the lockout weakness that kills diamond push-up progress. After 4 weeks, you'll blast through Level 5.`,
        accent: '#82d296',
      },
      {
        type: 'quote',
        content: `The one-arm push-up isn't a party trick. It's what happens when you spend a year being extremely serious about something most people dismiss as too basic.`,
        cite: 'Sarah Okafor, CSCS',
      },
      {
        type: 'h2',
        content: 'Common Mistakes (And How to Fix Them)',
      },
      {
        type: 'exercise-table',
        exercises: [
          { name: 'Hips sag on descent', sets: '—', reps: '—', rest: '—', cue: 'Re-engage glutes and abs before every rep. If it persists, drop one level — your core isn\'t ready yet.' },
          { name: 'Elbows flare at 90°', sets: '—', reps: '—', rest: '—', cue: 'Place a resistance band around your elbows. It forces inward tracking without thinking about it.' },
          { name: 'Half reps', sets: '—', reps: '—', rest: '—', cue: 'Use a rolled-up towel under your chest as a target. Chest must touch it every rep.' },
          { name: 'Rushing the descent', sets: '—', reps: '—', rest: '—', cue: 'Count out loud: "one-one-thousand, two-one-thousand." The eccentric is where strength is built.' },
          { name: 'Head forward', sets: '—', reps: '—', rest: '—', cue: 'Imagine holding a tennis ball under your chin. Neutral neck activates deep cervical flexors that stabilize the whole chain.' },
        ],
      },
      {
        type: 'callout',
        label: 'The Real Timeline',
        content: `Level 1 to Level 4: 4–8 weeks for complete beginners.\nLevel 4 to Level 7: 3–6 months of consistent training.\nLevel 7 to Level 9: 6–18 months depending on starting strength and consistency.\n\nAnyone promising faster results is selling you something. Respect the timeline and the results will be permanent.`,
        accent: '#58a6ff',
      },
      {
        type: 'h2',
        content: 'What Comes After Level 9?',
      },
      {
        type: 'body',
        content: `Once you own the one-arm push-up, the world opens up. The next frontier is the planche progression — essentially a push-up with your feet off the ground, arms at your sides, body parallel to the floor. It takes years. It is completely achievable with bodyweight training alone. And it will make you the strongest presser in any room you walk into, barbell or not.

Start there when you're ready. For now, get to Level 9. That alone puts you in the top 1% of training for upper-body strength.`,
      },
      {
        type: 'divider',
      },
    ],
  },

  'best-resistance-bands': {
    slug: 'best-resistance-bands',
    title: 'The 7 Best Resistance Bands for Home Workouts in 2026',
    subtitle: 'We tested 14 sets over 8 weeks. Here is exactly which bands are worth your money — and which ones snapped mid-squat.',
    author: 'Marcus Webb',
    authorRole: 'Equipment Reviewer · Former D1 Strength Coach',
    date: 'February 20, 2026',
    readTime: '9 min read',
    tag: 'Equipment Review',
    heroImage: 'https://images.unsplash.com/photo-1598289431512-b97b0917afba?w=1400&q=85&fit=crop',
    sections: [
      {
        type: 'intro',
        content: `Resistance bands are the most overlooked piece of fitness equipment available. A $30 set can replace $3,000 of cable machine work — if you buy the right ones. The problem is that the market is flooded with garbage. We bought 14 sets across 6 months of testing to find out which ones actually hold up.`,
      },
      {
        type: 'callout',
        label: 'Testing Methodology',
        content: `Every band was tested across 8 weeks of daily use: 500+ reps of squats, rows, pull-apart variations, and overhead work. We measured snap resistance, stretch consistency, and whether the bands maintained their stated resistance level after breaking in. Three sets failed during testing. Only the best 7 made this list.`,
        accent: '#e8521a',
      },
    ],
  },
}
