import { useState } from 'react';
import { SignInButton, useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

import CommentForm from '@/app/snippets/[id]/_components/comment-form';
import Comment from '@/app/snippets/[id]/_components/comment';

import { Comment as CommentType, Snippet } from '@/types';

export default function Comments({ snippetId }: { snippetId: Snippet['_id'] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const { user } = useUser();
  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);

    try {
      await addComment({ snippetId, content });
      toast.success('Comment added successfully');
    } catch (error) {
      console.log('Error adding comment:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: CommentType['_id']) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.log('Error deleting comment:', error);
      toast.error('Something went wrong');
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 pt-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        {comments.length > 0 && (
          <div className="mt-8 space-y-6">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={deletingCommentId === comment._id}
                currentUserId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
