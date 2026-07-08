-- Refreshes the KSV placeholder row with a real, dated event (2026 Career Expo)
-- and adds three new Melbourne community events sourced from woorimel.com.
UPDATE public.community_events
SET
  title = '2026 멜버른 한인회 커리어 엑스포',
  description = '빅토리아주 한인회가 주최하고 주호주 대한민국대사관 멜버른분관이 후원하는 커리어 엑스포입니다. 간호, 회계·세무, 정책·공공기관, 데이터·AI, 치과, 약학 등 다양한 분야에서 활동 중인 현직 한인 멘토 13인이 참여해 실제 구직 과정, 업계 전망, 유학 이후 영주권 취득까지 실질적인 이야기를 나눕니다. 유학생, 워킹홀리데이, 구직자, 커리어 전환을 고민하는 분들에게 유용한 자리이며 참가비는 무료입니다. 문의: 남용진 0432 243 064',
  event_date_label = '7월 25일 오후 2-5시',
  location_label = '멜버른',
  image_url = 'https://woorimel.com/uploads/post/2026/06/4c41407c8011fd53564e0eaced1f1e4f.png',
  source_url = 'https://woorimel.com/community-freeboard/post/485327',
  updated_at = now()
WHERE organizer = 'KSV';

INSERT INTO public.community_events
  (title, organizer, description, event_date_label, location_label, image_url, source_url, sort_order, is_active)
VALUES
(
  'Christmas in July 유학생·워홀 파티',
  'iEduNet',
  '아이에듀넷 유학원이 여는 유학생과 워킹홀리데이 메이커를 위한 크리스마스 인 줄라이 파티입니다. 팀 게임과 개인 게임, 음식과 음료, 크리스마스 경품이 준비되며 참가 인원은 45명으로 제한됩니다. 새로운 친구를 만들고 싶은 유학생·워홀러에게 좋은 자리입니다. 신청: linktr.ee/iedunet',
  '7월 31일 오후 3-5시',
  '멜버른',
  'https://woorimel.com/uploads/editor/2026/07/be5a8c9d5ef2691c72db596be966e13b.png',
  'https://woorimel.com/community-offline/post/486971',
  7,
  true
),
(
  '멜버른 한인 보드게임 모임 BGM',
  'BGM',
  '멜버른에서 정기적으로 열리는 한인 보드게임 모임입니다. 보드게임 경험이 없어도 참여할 수 있으며, 기존 친목 그룹끼리만 어울리지 않고 새로운 사람들과 자연스럽게 섞여 즐길 수 있는 분위기를 지향합니다. 매너와 책임감 있는 참여를 중요하게 생각합니다. 정확한 다음 모임 일정은 인스타그램(@bgm_boardgame_in_melbourne)과 카카오 오픈채팅(open.kakao.com/o/gLo4TXLb)에서 확인할 수 있습니다.',
  '정기 모임',
  '멜버른',
  NULL,
  'https://woorimel.com/community-offline/post/483728',
  8,
  true
),
(
  '멜버른 20·30대 북클럽',
  '멜번 시티 북클럽',
  '멜버른 시티 카페에서 한 달에 두 번, 2주마다 모이는 20~30대 한인 독서 모임입니다. 책, 영화, 영상 등 자유 주제로 이야기 나누는 모임과 매달 지정 도서를 함께 읽고 토론하는 모임을 번갈아 진행합니다. 새로운 사람들과의 만남, 대화, 자기계발에 관심 있는 분들에게 추천합니다. 참여 문의는 카카오톡 오픈채팅(open.kakao.com/o/g1Olkudi)으로 가능합니다.',
  '격주 모임',
  '멜버른',
  NULL,
  'https://woorimel.com/community-offline/post/475032',
  9,
  true
);
