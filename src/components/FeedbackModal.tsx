import React, { useState } from 'react';
import {
  X,
  Star,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { UserFeedback } from '../types';
import { saveFeedback } from '../services/storage';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onShowToast: (msg: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  theme,
  onShowToast,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && rating === 0) return;

    const feedbackData: UserFeedback = {
      id: `fb_${Date.now()}`,
      rating,
      message: message.trim(),
      userName: userName.trim() || undefined,
      contact: contact.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    saveFeedback(feedbackData);
    setSubmitted(true);
    onShowToast('Shukriya! Aap ka feedback mil gaya hai.');

    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setUserName('');
      setContact('');
      onClose();
    }, 1400);
  };

  const starLabels = ['Needs Work', 'Fair', 'Good', 'Very Good', 'Excellent! 🔥'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#03241b] to-[#01140e] border-amber-400/30 text-white'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-emerald-900/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Rate Us & Feedback</h2>
            <p className="text-xs text-stone-400">Share your thoughts with the developer</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-amber-300">Shukriya! Aap ka feedback mil gaya hai.</h3>
            <p className="text-xs text-stone-300">
              Aap ki raye se app ko mazeed behtar banane mein madad milegi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* 5-Star Interactive Rating Component */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2">
              <span className="text-stone-300 font-semibold block text-xs">
                How would you rate RateCompare?
              </span>

              <div className="flex justify-center items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 active:scale-95"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                            : 'text-stone-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <span className="text-[11px] font-bold text-amber-300 block">
                {starLabels[(hoverRating || rating) - 1]}
              </span>
            </div>

            {/* Feedback Message */}
            <div>
              <label className="block text-stone-300 mb-1.5 font-semibold">
                Your Review / Suggestion
              </label>
              <textarea
                required
                rows={3}
                placeholder="Aap ki raye humare liye ahem hai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            {/* Optional Name and Contact */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-stone-300 mb-1 text-[11px] font-semibold">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tariq Khan"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 text-[11px] font-semibold">
                  Phone/WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. +966..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Feedback Bhejein</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
