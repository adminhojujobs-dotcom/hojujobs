-- Trims the longer Melbourne event descriptions added in
-- 20260709010000_add_melbourne_community_events.sql for card readability.
UPDATE public.community_events
SET description = '빅토리아주 한인회가 주최하는 커리어 엑스포입니다. 간호, 회계·세무, 정책, 데이터·AI, 치과 등 다양한 분야의 현직 한인 멘토 13인과 구직 과정, 업계 전망, 영주권 관련 이야기를 나눌 수 있습니다. 유학생과 구직자, 커리어 전환을 고민하는 분들께 추천하며 참가비는 무료입니다. 문의: 0432 243 064',
    updated_at = now()
WHERE id = 'c720e751-90a1-4ad5-90a4-932e08a6ac1c';

UPDATE public.community_events
SET description = '멜버른에서 정기적으로 열리는 한인 보드게임 모임입니다. 경험이 없어도 참여할 수 있고, 새로운 사람들과 자연스럽게 어울리는 분위기를 지향합니다. 매너와 책임감 있는 참여가 중요합니다. 일정 확인: 인스타그램 @bgm_boardgame_in_melbourne, 카카오 오픈채팅 open.kakao.com/o/gLo4TXLb',
    updated_at = now()
WHERE id = 'd6f7ae41-2bcb-44e0-b007-30e0005c086c';

UPDATE public.community_events
SET description = '멜버른 시티 카페에서 2주마다 모이는 20~30대 한인 독서 모임입니다. 자유 주제 토론과 지정 도서 토론을 번갈아 진행하며, 새로운 사람들과의 만남과 자기계발에 관심 있는 분들께 추천합니다. 문의: 카카오 오픈채팅 open.kakao.com/o/g1Olkudi',
    updated_at = now()
WHERE id = '4ee33223-a945-4bd8-b4c5-a407c3ba9e08';
