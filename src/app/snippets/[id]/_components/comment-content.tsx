import CodeBlock from '@/app/snippets/[id]/_components/code-block';

export default function CommentContent({ content }: { content: string }) {
  // regex
  const parts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

  return (
    <div className="max-w-none text-white">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);

          if (match) {
            const [, language, code] = match;
            return <CodeBlock key={index} language={language} code={code} />;
          }
        }

        return part.split('\n').map((line, lineIdx) => (
          <p key={lineIdx} className=" text-sm mb-4 text-gray-300 last:mb-0">
            {line}
          </p>
        ));
      })}
    </div>
  );
}
