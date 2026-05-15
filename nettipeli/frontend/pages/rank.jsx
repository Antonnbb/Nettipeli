export function getAimRank(score) {
  if (score >= 60) return "Immortal";
  if (score >= 50) return "Diamond";
  if (score >= 40) return "Platinum";
  if (score >= 30) return "Gold";
  if (score >= 20) return "Silver";
  return "Bronze";
}

export function getTrackingRank(score) {
  if (score >= 400) return "Immortal";
  if (score >= 300) return "Diamond";
  if (score >= 200) return "Platinum";
  if (score >= 120) return "Gold";
  if (score >= 60) return "Silver";
  return "Bronze";
}

export function getReactionRank(time) {
  if (time <= 180) return "Immortal";
  if (time <= 200) return "Diamond";
  if (time <= 220) return "Platinum";
  if (time <= 250) return "Gold";
  if (time <= 300) return "Silver";
  return "Bronze";
}

export function getRankIcon(rank) {
  switch (rank) {
    case "Immortal": return "🔥";
    case "Diamond": return "💎";
    case "Platinum": return "🔷";
    case "Gold": return "🥇";
    case "Silver": return "🥈";
    case "Bronze": return "🥉";
    default: return "";
  }
}