import React from "react";

interface CommentData {
  searchQueryCount: number;
  comment: string;
}

interface CommentsTableProps {
  data: CommentData[];
  totalResponses: number;
  emptyMessage?: string;
  queryColumnLabel?: string;
  commentColumnLabel?: string;
}

export function CommentsTable({
  data,
  totalResponses,
  emptyMessage = "No comments provided in the current selection.",
  queryColumnLabel = "Queries\nTried",
  commentColumnLabel = "Comment",
}: CommentsTableProps) {
  return (
    <>
      <p className="text-muted-foreground mt-3 mb-2 text-sm">
        {data.length} comments out of {totalResponses} total responses
      </p>
      <div className="space-y-4">
        {data.length > 0 ? (
          <div className="overflow-hidden rounded-lg border">
            <div className="grid grid-cols-[min-content_1fr] items-center">
              {/* Header */}
              <div className="flex items-center justify-center border-b bg-gray-50 px-4 py-2 text-center text-sm font-semibold whitespace-nowrap">
                {queryColumnLabel.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < queryColumnLabel.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex h-full items-center border-b bg-gray-50 px-4 py-2 text-sm font-semibold">
                {commentColumnLabel}
              </div>

              {/* Content rows */}
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-center px-4 py-3 hover:bg-gray-50">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800">
                      {item.searchQueryCount}
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm leading-relaxed text-gray-900">
                      {item.comment}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
