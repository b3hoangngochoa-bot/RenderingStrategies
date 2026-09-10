export const quotes: string[] = [
  "Không có việc gì khó, chỉ sợ lòng không bền.",
  "Muốn đi nhanh thì đi một mình, muốn đi xa thì đi cùng nhau.",
  "Học, học nữa, học mãi.",
  "Thất bại là mẹ thành công.",
  "Có công mài sắt, có ngày nên kim.",
  "Đi một ngày đàng, học một sàng khôn.",
  "Uống nước nhớ nguồn.",
  "Lửa thử vàng, gian nan thử sức.",
  "Không thầy đố mày làm nên.",
  "Cần cù bù thông minh.",
  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.",
  "Có chí thì nên.",
  "Đường đi khó, không khó vì ngăn sông cách núi, mà khó vì lòng người ngại núi e sông.",
  "Sông có khúc, người có lúc.",
  "Ăn quả nhớ kẻ trồng cây.",
];

export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Base URL để các Server Component có thể gọi fetch() tới chính API route
// nội bộ (fetch trên server bắt buộc cần URL tuyệt đối).
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return "http://localhost:3000";
}
