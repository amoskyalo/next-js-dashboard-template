import dynamic from 'next/dynamic';

const DefaultMenu = dynamic(() => import('./DefaultMenu'), { ssr: false });

export { default as ProfileMenu } from './ProfileMenu';
export { DefaultMenu };
