export default function MatchBar({ percent }) {
  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs">{percent}% match</p>
    </div>
  );
}
