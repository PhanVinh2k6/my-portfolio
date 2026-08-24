import { ImageResponse } from 'next/og';

export const alt = 'Phan Vinh — Product-minded Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#f2f0eb', color: '#171817', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '64px 72px', width: '100%' }}>
      <div style={{ color: '#3157c7', display: 'flex', fontFamily: 'Arial', fontSize: 26, fontWeight: 800, letterSpacing: '-0.08em' }}>PV <span style={{ color: '#787871', fontSize: 15, letterSpacing: '0.12em', marginLeft: 16, paddingTop: 8 }}>PORTFOLIO / 26</span></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#787871', display: 'flex', fontFamily: 'Arial', fontSize: 16, fontWeight: 700, letterSpacing: '0.16em', marginBottom: 22, textTransform: 'uppercase' }}>Product-minded developer</div>
        <div style={{ display: 'flex', fontFamily: 'Georgia', fontSize: 92, letterSpacing: '-0.08em', lineHeight: 0.9 }}>Building digital products</div>
        <div style={{ color: '#3157c7', display: 'flex', fontFamily: 'Georgia', fontSize: 92, fontStyle: 'italic', letterSpacing: '-0.08em', lineHeight: 0.9 }}>with clarity.</div>
      </div>
      <div style={{ borderTop: '1px solid #d2d0c9', color: '#787871', display: 'flex', fontFamily: 'Arial', fontSize: 16, justifyContent: 'space-between', paddingTop: 20 }}><span>phanvinh.id.vn</span><span>Thai Nguyen, Vietnam</span></div>
    </div>,
    { ...size },
  );
}
