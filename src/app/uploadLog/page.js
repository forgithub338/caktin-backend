"use client";

import { useState, useEffect } from "react";

export default function UploadLog() {
  const [uploadLog, setUploadLog] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 判斷是否還有下一頁

  const fetchUploadLog = async (pageNum) => {
    setLoading(true);
    const response = await fetch(`/api/uploadLog?page=${pageNum}`);
    const data = await response.json();

    // 如果回傳少於 10 筆，表示後面沒有資料了
    setHasMore(data.length === 10);

    const processed = data.map((log) => {
      const originalDate = new Date(log.uploadTIme);
      const adjustedDate = new Date(originalDate.getTime() + 6 * 60 * 60 * 1000);
      return {
        ...log,
        adjustedUploadTime: adjustedDate,
      };
    });

    setUploadLog(processed);
    setLoading(false);
  };

  useEffect(() => {
    fetchUploadLog(page);
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">上傳紀錄</h1>

      {uploadLog.length === 0 && !loading ? (
        <p className="text-gray-600">目前沒有紀錄。</p>
      ) : (
        <>
          <table className="w-full border border-green-300 mb-4">
            <thead className="bg-green-100">
              <tr>
                <th className="border px-4 py-2">上傳時間</th>
                <th className="border px-4 py-2">操作者</th>
                <th className="border px-4 py-2">班級</th>
                <th className="border px-4 py-2">袋數</th>
              </tr>
            </thead>
            <tbody>
              {uploadLog.map((log, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">
                    {log.adjustedUploadTime.toLocaleString("zh-TW", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="border px-4 py-2">{log.user}</td>
                  <td className="border px-4 py-2">{log.grade}{log.class < 10 ? `0${log.class}` : log.class}</td>
                  <td className="border px-4 py-2">{log.amount} 袋</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-green-400 rounded disabled:bg-gray-300 text-white"
            >
              上一頁
            </button>

            <span>第 {page} 頁</span>

            <button
              disabled={!hasMore || loading}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-green-500 rounded disabled:bg-gray-300 text-white"
            >
              下一頁
            </button>
          </div>
        </>
      )}
    </div>
  );
}
