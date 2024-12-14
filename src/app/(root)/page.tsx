import Header from '@/app/(root)/_components/header';
import EditorPanel from '@/app/(root)/_components/editor-panel';
import OutputPanel from '@/app/(root)/_components/output-panel';

export default function RootPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
