import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#f4f8f7', text: '#050a0f', accent: '#335cff' },
  fonts: {
    display:
      "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    body: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  },
  typeScale: { hero: 112, body: 32 },
  radius: 18,
};

const tokens = {
  blue: '#335cff',
  blueSoft: '#e9efff',
  ink: '#050a0f',
  muted: '#687383',
  faint: '#9aa5b3',
  line: '#dce5ea',
  panel: '#ffffff',
  green: '#1f9d68',
  amber: '#d98b12',
  red: '#d94b4b',
  padX: 112,
  padY: 78,
  total: 30,
} as const;

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const keyframes = `
@keyframes dhFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dhLine {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.dh-fade { animation: dhFadeUp 560ms cubic-bezier(0.16, 1, 0.3, 1) both; }
.dh-line { animation: dhLine 700ms cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left center; }
`;

type SlideKind = 'cover' | 'divider' | 'story' | 'compare' | 'flow' | 'cards' | 'steps' | 'closing';

type SlideSpec = {
  kind: SlideKind;
  section: string;
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  cards?: Array<{
    label?: string;
    title: string;
    body: string;
    tone?: 'blue' | 'green' | 'amber' | 'ink';
  }>;
  left?: { title: string; body: string; points?: string[] };
  right?: { title: string; body: string; points?: string[]; tone?: 'blue' | 'green' };
  steps?: string[];
  note?: ReactNode;
};

const Style = () => <style>{keyframes}</style>;

const Blue = ({ children }: { children: ReactNode }) => (
  <span style={{ color: tokens.blue }}>{children}</span>
);

const Mark = ({
  children,
  tone = 'blue',
}: {
  children: ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'ink';
}) => {
  const color =
    tone === 'green'
      ? tokens.green
      : tone === 'amber'
        ? tokens.amber
        : tone === 'ink'
          ? tokens.ink
          : tokens.blue;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        background: tone === 'ink' ? '#edf2f5' : `${color}18`,
        color,
        fontSize: 22,
        fontWeight: 900,
        padding: '10px 16px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

const Brand = ({ section }: { section: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 52,
      left: tokens.padX,
      right: tokens.padX,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 5,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          display: 'grid',
          placeItems: 'center',
          background: tokens.blue,
          color: '#fff',
          fontSize: 26,
          fontWeight: 950,
          boxShadow: '0 16px 36px rgba(51, 92, 255, 0.22)',
        }}
      >
        +
      </span>
      <span style={{ fontSize: 28, fontWeight: 870, letterSpacing: '-0.02em' }}>
        Document Harness
      </span>
    </div>
    <Mark>{section}</Mark>
  </div>
);

const Footer = ({ page }: { page: number }) => (
  <div
    style={{
      position: 'absolute',
      left: tokens.padX,
      right: tokens.padX,
      bottom: 40,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      color: tokens.muted,
      fontSize: 20,
      fontWeight: 760,
      zIndex: 5,
    }}
  >
    <span>Hermes Agent Community Meetup @ Seoul</span>
    <span style={{ color: tokens.ink, fontSize: 29, letterSpacing: '0.02em' }}>
      {String(page).padStart(2, '0')} / {String(tokens.total).padStart(2, '0')}
    </span>
  </div>
);

const Shell = ({
  spec,
  page,
  children,
}: {
  spec: SlideSpec;
  page: number;
  children: ReactNode;
}) => (
  <div style={fill}>
    <Style />
    <Brand section={spec.section} />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 86% 18%, rgba(51, 92, 255, 0.08), transparent 27%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(244,248,247,0.9))',
      }}
    />
    <main
      style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        padding: `${tokens.padY + 70}px ${tokens.padX}px 98px`,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </main>
    <Footer page={page} />
  </div>
);

const Kicker = ({ children }: { children: ReactNode }) => (
  <div
    className="dh-fade"
    style={{
      color: tokens.muted,
      fontSize: 28,
      fontWeight: 790,
      letterSpacing: '0.12em',
      marginBottom: 26,
    }}
  >
    {children}
  </div>
);

const Headline = ({
  children,
  size = 82,
  maxWidth = 1340,
}: {
  children: ReactNode;
  size?: number;
  maxWidth?: number;
}) => (
  <h1
    className="dh-fade"
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: '-0.058em',
      fontWeight: 950,
      margin: 0,
      maxWidth,
    }}
  >
    {children}
  </h1>
);

const Body = ({ children, maxWidth = 1320 }: { children: ReactNode; maxWidth?: number }) => (
  <p
    className="dh-fade"
    style={{
      animationDelay: '90ms',
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.5,
      color: tokens.muted,
      fontWeight: 650,
      maxWidth,
      margin: '32px 0 0',
    }}
  >
    {children}
  </p>
);

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    className="dh-fade"
    style={{
      background: tokens.panel,
      border: `1px solid ${tokens.line}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: '0 26px 72px rgba(20, 38, 60, 0.085)',
      padding: 32,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const CardGrid = ({ cards }: { cards: NonNullable<SlideSpec['cards']> }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(cards.length, 4)}, 1fr)`,
      gap: 22,
      marginTop: 56,
    }}
  >
    {cards.map((card, index) => (
      <Card key={card.title} style={{ minHeight: cards.length >= 4 ? 280 : 310 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Mark tone={card.tone}>{card.label ?? String(index + 1).padStart(2, '0')}</Mark>
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: cards.length >= 4 ? 34 : 40,
            lineHeight: 1.16,
            letterSpacing: '-0.048em',
            fontWeight: 930,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            marginTop: 20,
            color: tokens.muted,
            fontSize: cards.length >= 4 ? 24 : 27,
            lineHeight: 1.46,
            fontWeight: 650,
          }}
        >
          {card.body}
        </div>
      </Card>
    ))}
  </div>
);

const Compare = ({ spec }: { spec: SlideSpec }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 54 }}>
    {[spec.left, spec.right].map((side, index) =>
      side ? (
        <Card
          key={side.title}
          style={{
            minHeight: 430,
            padding: 42,
            border: index === 1 ? `2px solid ${tokens.blue}` : `1px solid ${tokens.line}`,
          }}
        >
          <Mark tone={index === 1 ? (spec.right?.tone ?? 'blue') : 'ink'}>
            {index === 0 ? 'Before' : 'With Hermes'}
          </Mark>
          <div
            style={{
              marginTop: 34,
              fontSize: 42,
              lineHeight: 1.18,
              fontWeight: 940,
              letterSpacing: '-0.05em',
            }}
          >
            {side.title}
          </div>
          <p
            style={{
              margin: '24px 0 0',
              color: tokens.muted,
              fontSize: 28,
              lineHeight: 1.45,
              fontWeight: 650,
            }}
          >
            {side.body}
          </p>
          {side.points ? (
            <div style={{ display: 'grid', gap: 14, marginTop: 30, fontSize: 25, fontWeight: 760 }}>
              {side.points.map((point) => (
                <div key={point}>✓ {point}</div>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null,
    )}
  </div>
);

const Flow = ({ steps }: { steps: string[] }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 14,
      marginTop: 70,
    }}
  >
    {steps.map((step, index) => (
      <div key={step} style={{ position: 'relative' }}>
        <Card style={{ minHeight: 220, padding: 25 }}>
          <div style={{ fontSize: 29, color: tokens.blue, fontWeight: 940 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div
            style={{
              marginTop: 34,
              fontSize: 30,
              lineHeight: 1.22,
              fontWeight: 900,
              letterSpacing: '-0.045em',
            }}
          >
            {step}
          </div>
        </Card>
        {index < steps.length - 1 ? (
          <div
            style={{
              position: 'absolute',
              right: -15,
              top: 108,
              width: 30,
              height: 2,
              background: tokens.blue,
              zIndex: 6,
            }}
          />
        ) : null}
      </div>
    ))}
  </div>
);

const Steps = ({ steps }: { steps: string[] }) => (
  <div style={{ display: 'grid', gap: 18, marginTop: 50, maxWidth: 1380 }}>
    {steps.map((step, index) => (
      <div
        key={step}
        className="dh-fade"
        style={{
          display: 'grid',
          gridTemplateColumns: '94px 1fr',
          gap: 24,
          alignItems: 'center',
          background: tokens.panel,
          border: `1px solid ${tokens.line}`,
          borderRadius: 18,
          boxShadow: '0 18px 42px rgba(20, 38, 60, 0.06)',
          padding: '20px 26px',
        }}
      >
        <Mark>{String(index + 1).padStart(2, '0')}</Mark>
        <div style={{ fontSize: 30, lineHeight: 1.32, fontWeight: 800, color: tokens.ink }}>
          {step}
        </div>
      </div>
    ))}
  </div>
);

const DividerSlide = ({ spec, page }: { spec: SlideSpec; page: number }) => (
  <div
    style={{
      ...fill,
      padding: '82px 112px 72px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Style />
    <div
      className="dh-line"
      style={{
        position: 'absolute',
        top: 84,
        left: 112,
        right: 112,
        height: 2,
        background: tokens.ink,
      }}
    />
    <div style={{ position: 'absolute', top: 112, left: 112 }}>
      <Mark>{spec.section}</Mark>
    </div>
    <Headline size={118} maxWidth={1450}>
      {spec.title}
    </Headline>
    {spec.body ? <Body maxWidth={1180}>{spec.body}</Body> : null}
    <Footer page={page} />
  </div>
);

const CoverSlide = () => (
  <div style={{ ...fill, padding: '84px 112px 72px' }}>
    <Style />
    <div
      className="dh-line"
      style={{
        position: 'absolute',
        top: 84,
        left: 112,
        right: 112,
        height: 2,
        background: tokens.ink,
      }}
    />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 23,
        fontWeight: 850,
        letterSpacing: '0.34em',
      }}
    >
      <span>HERMES</span>
      <span>AGENT</span>
      <span>COMMUNITY</span>
    </div>
    <div style={{ marginTop: 96 }}>
      <div style={{ color: tokens.blue, fontSize: 32, fontWeight: 900, marginBottom: 30 }}>
        Document Harness
      </div>
      <h1
        className="dh-fade"
        style={{
          fontSize: 134,
          lineHeight: 0.98,
          letterSpacing: '-0.075em',
          fontWeight: 970,
          maxWidth: 1500,
          margin: 0,
        }}
      >
        문서작성,
        <br />
        <Blue>이젠 에이전트에게</Blue>
        <br />
        맡겨 보세요.
      </h1>
      <p
        className="dh-fade"
        style={{
          animationDelay: '120ms',
          margin: '52px 0 0',
          fontSize: 37,
          lineHeight: 1.45,
          color: tokens.muted,
          fontWeight: 680,
          maxWidth: 1260,
        }}
      >
        DOCX, PPTX, HWP를 만들고 편집하고 검증 증거까지 남기는 문서 실행 에이전트.
      </p>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        bottom: 72,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 25,
        color: tokens.muted,
        fontWeight: 780,
      }}
    >
      <span>Sionic AI · Document Harness Studio</span>
      <span>2026.05.09 · Seoul</span>
    </div>
  </div>
);

const RenderSlide = ({ spec, page }: { spec: SlideSpec; page: number }) => {
  if (spec.kind === 'cover') return <CoverSlide />;
  if (spec.kind === 'divider') return <DividerSlide spec={spec} page={page} />;
  if (spec.kind === 'closing') {
    return (
      <div
        style={{
          ...fill,
          padding: '84px 112px 72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Style />
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 112,
            right: 112,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: tokens.blue, fontSize: 31, fontWeight: 900 }}>Document Harness</div>
          <Mark>Launch</Mark>
        </div>
        <Kicker>{spec.kicker}</Kicker>
        <Headline size={118} maxWidth={1340}>
          {spec.title}
        </Headline>
        {spec.body ? <Body maxWidth={1160}>{spec.body}</Body> : null}
        <div
          style={{
            position: 'absolute',
            left: 112,
            right: 112,
            bottom: 72,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            fontSize: 27,
            fontWeight: 800,
            color: tokens.muted,
          }}
        >
          <span>Sionic AI · Document Harness Studio</span>
          <span style={{ color: tokens.blue, fontSize: 34, fontWeight: 940 }}>감사합니다.</span>
        </div>
      </div>
    );
  }

  return (
    <Shell spec={spec} page={page}>
      {spec.kicker ? <Kicker>{spec.kicker}</Kicker> : null}
      <Headline size={spec.kind === 'story' ? 86 : 80}>{spec.title}</Headline>
      {spec.body ? <Body>{spec.body}</Body> : null}
      {spec.kind === 'compare' ? <Compare spec={spec} /> : null}
      {spec.kind === 'flow' && spec.steps ? <Flow steps={spec.steps} /> : null}
      {spec.kind === 'cards' && spec.cards ? <CardGrid cards={spec.cards} /> : null}
      {spec.kind === 'steps' && spec.steps ? <Steps steps={spec.steps} /> : null}
      {spec.note ? (
        <div
          style={{
            marginTop: 34,
            border: `2px solid ${tokens.blue}`,
            borderRadius: 16,
            padding: '20px 26px',
            background: 'rgba(255,255,255,0.76)',
            fontSize: 27,
            fontWeight: 850,
          }}
        >
          {spec.note}
        </div>
      ) : null}
    </Shell>
  );
};

const slides: SlideSpec[] = [
  {
    kind: 'cover',
    section: 'Opening',
    title: null,
  },
  {
    kind: 'divider',
    section: '01 / Context',
    title: (
      <>
        먼저,
        <br />
        <Blue>왜 문서인가</Blue>부터 보겠습니다.
      </>
    ),
    body: '에이전트를 기술이 아니라 사용자의 일상 업무에서 출발시키는 이야기입니다.',
  },
  {
    kind: 'cards',
    section: 'Audience',
    kicker: '사용자 분포를 바꿔서 보면',
    title: (
      <>
        개발자 1-10%가 아니라
        <br />
        <Blue>문서 사용자 90-95%</Blue>가 핵심입니다.
      </>
    ),
    cards: [
      {
        label: '1-10%',
        title: '개발자 / 파워유저',
        body: '자동화 스크립트, API, 워크플로를 직접 만들 수 있는 사람들입니다.',
        tone: 'ink',
      },
      {
        label: '90-95%',
        title: '일반 사무직',
        body: '코드는 쓰지 않지만 매일 문서를 만들고 고치고 검수합니다.',
        tone: 'blue',
      },
      {
        label: '핵심',
        title: '대중화 접점',
        body: 'AI 에이전트의 첫 경험은 코딩보다 문서에서 더 자연스럽습니다.',
        tone: 'green',
      },
    ],
  },
  {
    kind: 'divider',
    section: '02 / Problem',
    title: (
      <>
        지금 문서 업무는
        <br />
        <Blue>흐름이 끊겨 있습니다.</Blue>
      </>
    ),
    body: '문제는 글을 못 쓰는 것이 아니라, 자료부터 검증까지의 흐름이 분리되어 있다는 점입니다.',
  },
  {
    kind: 'flow',
    section: 'Scattered tools',
    kicker: '문서 작업의 현실',
    title: (
      <>
        자료, 초안, 논의, 검수가
        <br />
        <Blue>서로 다른 곳</Blue>에 있습니다.
      </>
    ),
    body: '도구가 흩어질수록 맥락은 사라지고, 사람이 같은 설명을 반복하게 됩니다.',
    steps: [
      '자료는 드라이브',
      '초안은 워드/한글',
      '논의는 채팅/메일',
      '검수는 PPT/체크리스트',
      '최종본은 다시 파일',
    ],
  },
  {
    kind: 'cards',
    section: 'Repeated briefing',
    kicker: '반복되는 설명',
    title: (
      <>
        매번 다시 말하는
        <br />
        <Blue>문서 규칙</Blue>이 있습니다.
      </>
    ),
    cards: [
      { title: '양식', body: '이 부서 양식대로 다시 만들어 주세요.', tone: 'blue' },
      { title: '인용', body: '인용은 항상 NCT id 기준으로 맞춰 주세요.', tone: 'blue' },
      { title: '톤', body: '임원용이라 결론 먼저, 짧게 써 주세요.', tone: 'blue' },
      { title: '검수', body: 'PPT 잘렸는지, 제목 넘치는지 다시 봐 주세요.', tone: 'blue' },
    ],
  },
  {
    kind: 'story',
    section: 'Real risk',
    kicker: '진짜 비용',
    title: (
      <>
        시간이 많이 드는 이유는
        <br />
        <Blue>작성</Blue>보다 <Blue>재설명</Blue>입니다.
      </>
    ),
    body: '처음부터 글을 쓰는 시간보다, 사람과 도구 사이에서 기준을 다시 맞추고 빠진 항목을 확인하는 시간이 더 커집니다.',
  },
  {
    kind: 'divider',
    section: '03 / Product',
    title: (
      <>
        Document Harness는
        <br />
        <Blue>문서 실행 환경</Blue>입니다.
      </>
    ),
    body: '챗봇이 아니라, 문서 작업을 시작해서 실제 산출물과 검증 증거까지 남기는 작업 공간입니다.',
  },
  {
    kind: 'compare',
    section: 'Definition',
    kicker: '제품 한 줄 정의',
    title: (
      <>
        답변 생성이 아니라,
        <br />
        <Blue>업무 흐름의 완결</Blue>입니다.
      </>
    ),
    left: {
      title: '일반 챗봇',
      body: '대화창에 답을 줍니다. 이후 파일 작성, 편집, 검증, 제출은 사람이 다시 해야 합니다.',
      points: ['복사해서 문서로 옮김', '검수 기준은 별도 관리', '다음 작업에 기억이 약함'],
    },
    right: {
      title: 'Document Harness',
      body: '자료를 읽고, 구조를 잡고, 파일을 만들고, 검증 증거와 handoff까지 남깁니다.',
      points: ['DOCX/PPTX/HWP 산출', '검증 체크리스트 유지', '두 번째 작업부터 재사용'],
      tone: 'blue',
    },
  },
  {
    kind: 'flow',
    section: 'End-to-end flow',
    kicker: '한 화면의 흐름',
    title: (
      <>
        문서 작업의 모든 단계가
        <br />
        <Blue>끊기지 않고</Blue> 이어집니다.
      </>
    ),
    steps: ['자료 입력', '플랜 확정', '초안 작성', '편집 확인', '검증', '산출물 저장'],
  },
  {
    kind: 'cards',
    section: 'Outputs',
    kicker: '실제 업무 파일',
    title: (
      <>
        끝에는 말이 아니라
        <br />
        <Blue>편집 가능한 파일</Blue>이 남습니다.
      </>
    ),
    cards: [
      {
        label: 'DOCX',
        title: '보고서 / 문서',
        body: '표지, 목차, 본문, 인용까지 수정 가능한 문서로 남깁니다.',
        tone: 'ink',
      },
      {
        label: 'PPTX',
        title: '발표자료',
        body: '본문 크기와 페이지 오버플로를 확인하며 PPTX로 만듭니다.',
        tone: 'blue',
      },
      {
        label: 'HWP',
        title: '조직 양식',
        body: '국문 표, 서식, 공공/내부 양식을 같은 흐름 안에서 맞춥니다.',
        tone: 'green',
      },
    ],
  },
  {
    kind: 'divider',
    section: '04 / Learning',
    title: (
      <>
        핵심은
        <br />
        <Blue>두 번째부터 빨라지는 것</Blue>입니다.
      </>
    ),
    body: '처음에는 알려줘야 하지만, 다음부터는 같은 기준을 에이전트가 기억하고 불러옵니다.',
  },
  {
    kind: 'compare',
    section: 'First vs second',
    kicker: '처음과 두 번째의 차이',
    title: (
      <>
        첫 번째는 설명하고,
        <br />두 번째부터는 <Blue>맞춰 들어옵니다.</Blue>
      </>
    ),
    left: {
      title: 'First Run',
      body: '사용자가 청중, 깊이, 톤, 양식, 인용 규칙, 검수 기준을 알려줍니다.',
      points: ['조건 입력', '초안 생성', '수정 요청', '검증 방식 확정'],
    },
    right: {
      title: 'With Hermes',
      body: '메모리, 사용자 프로필, 스킬, 큐레이터가 이전 기준을 다시 불러옵니다.',
      points: ['기준 자동 채움', '기본 템플릿 선택', '검증 루틴 재사용', '새 자료만 추가'],
      tone: 'green',
    },
  },
  {
    kind: 'cards',
    section: 'Learning system',
    kicker: '학습 구조',
    title: (
      <>
        네 가지 메커니즘이
        <br />
        <Blue>반복을 줄입니다.</Blue>
      </>
    ),
    cards: [
      { label: '01', title: '메모리', body: '환경, 규칙, 교훈을 기억합니다.', tone: 'blue' },
      {
        label: '02',
        title: '사용자 프로필',
        body: '선호와 작업 스타일을 파악합니다.',
        tone: 'green',
      },
      {
        label: '03',
        title: '스킬 자동 생성',
        body: '반복 작업을 실행 단위로 만듭니다.',
        tone: 'amber',
      },
      {
        label: '04',
        title: '백그라운드 큐레이터',
        body: '라이브러리를 주기적으로 정리합니다.',
        tone: 'ink',
      },
    ],
  },
  {
    kind: 'cards',
    section: 'User profile',
    kicker: '예시 프로필',
    title: (
      <>
        Medical Affairs Lead라면
        <br />
        <Blue>이런 기준</Blue>이 기본값이 됩니다.
      </>
    ),
    cards: [
      { title: '선호 톤', body: '의사결정자용, 결론 우선', tone: 'blue' },
      { title: '기본 길이', body: '본문 실행본 10쪽 안팎', tone: 'blue' },
      { title: '인용 스타일', body: 'Primary RCT, NCT id 기준', tone: 'blue' },
      { title: '작업 시간', body: '야간 배치, 오전 검토', tone: 'blue' },
    ],
  },
  {
    kind: 'story',
    section: 'Learning result',
    kicker: '결과',
    title: (
      <>
        사용자는 새 자료만 넣고,
        <br />
        에이전트는 <Blue>이전 흐름</Blue>을 적용합니다.
      </>
    ),
    body: '이번 분기 새 RCT만 넣으면, 이전에 확정한 청중, 톤, 인용 기준, 문서 구조, 검증 루틴을 기반으로 문서가 만들어집니다.',
    note: (
      <>
        핵심: 사용자가 프롬프트를 잘 쓰는 것이 아니라, <Blue>조직의 문서 흐름을 기억시키는 것</Blue>
        입니다.
      </>
    ),
  },
  {
    kind: 'divider',
    section: '05 / How to use',
    title: (
      <>
        이제 실제 사용 방법을
        <br />
        <Blue>처음부터 끝까지</Blue> 보겠습니다.
      </>
    ),
    body: '비개발자도 따라올 수 있도록 입력, 선택, 검토, 산출, 재사용 순서로 나눕니다.',
  },
  {
    kind: 'steps',
    section: 'Step 1',
    kicker: '사용 방법 01',
    title: (
      <>
        먼저 <Blue>자료</Blue>를 넣습니다.
      </>
    ),
    body: 'PDF, 기존 DOCX, 웹 링크, 표, 메모, 회의록처럼 문서의 원재료가 되는 자료를 한 곳에 모읍니다.',
    steps: [
      '원본 자료를 업로드하거나 연결합니다.',
      '자료별 출처와 사용 범위를 표시합니다.',
      '내부 전용 자료와 외부 제출 가능 자료를 구분합니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 2',
    kicker: '사용 방법 02',
    title: (
      <>
        다음은 <Blue>목적</Blue>을 정합니다.
      </>
    ),
    body: '에이전트가 문서를 잘 만들려면 누구에게, 왜, 어떤 결정을 위해 쓰는 문서인지 알아야 합니다.',
    steps: [
      '문서 종류를 선택합니다: 보고서, 제안서, 발표자료, 승인 문서.',
      '대상을 선택합니다: 임원, 고객, 내부 팀, 검토자.',
      '원하는 결과를 정합니다: 이해, 승인, 공유, 제출.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 3',
    kicker: '사용 방법 03',
    title: (
      <>
        <Blue>양식과 규칙</Blue>을 확인합니다.
      </>
    ),
    body: '처음에는 사람이 기준을 알려주고, 다음부터는 Hermes가 기본값을 제안합니다.',
    steps: [
      '분량, 톤, 목차 구조를 확인합니다.',
      '인용 방식과 금지 표현을 확인합니다.',
      'PPT 글자 크기, 페이지 오버플로, HWP 서식 같은 형식 규칙을 확인합니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 4',
    kicker: '사용 방법 04',
    title: (
      <>
        에이전트가 <Blue>초안</Blue>을 만듭니다.
      </>
    ),
    body: '이 단계에서 중요한 것은 완벽한 한 번의 생성이 아니라, 구조화된 초안이 편집 가능한 형태로 나오는 것입니다.',
    steps: [
      '자료를 요약하고 문서 구조를 만듭니다.',
      '본문과 표, 인용, 슬라이드 문구를 생성합니다.',
      '사용자가 바로 편집할 수 있는 화면에 배치합니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 5',
    kicker: '사용 방법 05',
    title: (
      <>
        사람이 <Blue>편집 화면</Blue>에서 확인합니다.
      </>
    ),
    body: '비개발자는 코드나 JSON을 볼 필요가 없습니다. 문서처럼 보고 바로 고치면 됩니다.',
    steps: [
      '잘린 제목, 긴 문장, 어색한 표현을 바로 확인합니다.',
      '섹션 순서와 강조점을 바꿉니다.',
      '수정 요청은 다음 실행의 학습 데이터가 됩니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 6',
    kicker: '사용 방법 06',
    title: (
      <>
        마지막으로 <Blue>검증</Blue>합니다.
      </>
    ),
    body: '문서 업무에서는 만든 파일만큼 검증 기록이 중요합니다. 검증이 남아야 다음 사람이 이어받을 수 있습니다.',
    steps: [
      '출처와 인용 누락을 확인합니다.',
      '형식 오류와 페이지 오버플로를 확인합니다.',
      '승인자, 서명란, handoff note를 남깁니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 7',
    kicker: '사용 방법 07',
    title: (
      <>
        산출물을 <Blue>내보내고 공유</Blue>합니다.
      </>
    ),
    body: '작업의 끝은 채팅 답변이 아니라, 실제 업무에서 제출하고 수정할 수 있는 파일입니다.',
    steps: [
      'DOCX, PPTX, HWP 중 필요한 형식으로 내보냅니다.',
      '사용자 접근 파일과 내부 검증 파일을 분리합니다.',
      '다음 담당자에게 handoff note와 함께 전달합니다.',
    ],
  },
  {
    kind: 'steps',
    section: 'Step 8',
    kicker: '사용 방법 08',
    title: (
      <>
        같은 일을 다시 할 때
        <br />
        <Blue>스킬로 재사용</Blue>합니다.
      </>
    ),
    body: '반복되는 문서 업무는 매번 새로 설명하지 않고, 조직의 작은 자동화 단위로 바뀝니다.',
    steps: [
      '자주 쓰는 문서 흐름을 스킬 후보로 저장합니다.',
      '검토자가 저장 여부를 확인합니다.',
      '다음 실행에서는 새 자료만 넣고 같은 흐름을 호출합니다.',
    ],
  },
  {
    kind: 'divider',
    section: '06 / Trust',
    title: (
      <>
        그래서 중요한 것은
        <br />
        <Blue>신뢰할 수 있는 산출</Blue>입니다.
      </>
    ),
    body: '문서 에이전트는 빠르기만 하면 안 됩니다. 무엇을 만들었고 무엇을 확인했는지 남겨야 합니다.',
  },
  {
    kind: 'cards',
    section: 'Trust evidence',
    kicker: '검증 증거',
    title: (
      <>
        파일과 함께
        <br />
        <Blue>작업의 증거</Blue>가 남습니다.
      </>
    ),
    cards: [
      { title: '체크리스트', body: '무엇을 확인했는지 남깁니다.', tone: 'blue' },
      { title: '승인 흐름', body: '검토자와 승인자를 비워두지 않습니다.', tone: 'green' },
      {
        title: '내부/외부 분리',
        body: '공유 가능한 파일과 내부 검증 파일을 구분합니다.',
        tone: 'amber',
      },
      { title: 'handoff note', body: '다음 사람이 무엇을 이어야 하는지 남깁니다.', tone: 'ink' },
    ],
  },
  {
    kind: 'compare',
    section: 'Business value',
    kicker: '도입 가치',
    title: (
      <>
        효율보다 먼저,
        <br />
        <Blue>반복 설명이 줄어듭니다.</Blue>
      </>
    ),
    left: {
      title: '기존 방식',
      body: '사람이 매번 자료를 모으고, 양식을 설명하고, 검수 기준을 다시 맞춥니다.',
      points: ['도구 이동이 많음', '맥락 손실', '검증 기록 분리'],
    },
    right: {
      title: 'Document Harness',
      body: '조직의 문서 흐름을 기억하고, 산출물과 검증 증거를 함께 남깁니다.',
      points: ['두 번째부터 빨라짐', '파일과 증거가 같이 남음', '비개발자도 사용 가능'],
      tone: 'blue',
    },
  },
  {
    kind: 'cards',
    section: 'Install / Download',
    kicker: '받는 곳과 실행 방법',
    title: (
      <>
        설치와 다운로드는
        <br />
        <Blue>GitHub와 Vercel</Blue>로 제공합니다.
      </>
    ),
    cards: [
      {
        label: 'GitHub',
        title: 'github.com/1weiho/open-slide',
        body: '슬라이드 소스는 apps/demo/slides/document-harness-meetup 안에 있습니다.',
        tone: 'ink',
      },
      {
        label: 'ZIP',
        title: 'Download ZIP',
        body: 'GitHub의 Code 버튼 또는 /archive/refs/heads/main.zip 링크로 받을 수 있습니다.',
        tone: 'blue',
      },
      {
        label: 'Local',
        title: 'pnpm install → pnpm --filter demo dev',
        body: '실행 후 /s/document-harness-meetup 경로에서 발표 덱을 엽니다.',
        tone: 'green',
      },
      {
        label: 'Web',
        title: 'Vercel 공개 URL',
        body: '설치 없이 브라우저에서 바로 볼 수 있는 링크를 함께 제공합니다.',
        tone: 'amber',
      },
    ],
  },
  {
    kind: 'closing',
    section: 'Closing',
    kicker: '문서 작업의 모든 단계, 한 화면에서',
    title: (
      <>
        반복 문서,
        <br />
        <Blue>이제 에이전트에게</Blue>
        <br />
        맡겨 보세요.
      </>
    ),
    body: 'AI 에이전트의 대중화는 코딩 도구에서만 일어나지 않습니다. 매일 문서를 만드는 90-95%의 사용자가 가장 쉽고 빠르게 접근하는 방식은 문서입니다.',
  },
];

const pages = slides.map((spec, index): Page => {
  const SlidePage: Page = () => <RenderSlide spec={spec} page={index + 1} />;
  return SlidePage;
});

export const meta: SlideMeta = {
  title: 'Document Harness Meetup',
};

export default pages satisfies Page[];
