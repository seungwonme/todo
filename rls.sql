-- RLS 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 todos 테이블에 접근 가능하도록 정책 설정
CREATE POLICY "Anyone can view todos" ON todos
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create todos" ON todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update todos" ON todos
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete todos" ON todos
  FOR DELETE USING (true);
