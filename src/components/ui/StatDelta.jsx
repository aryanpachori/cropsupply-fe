'use client'

export default function StatDelta({ value, suffix = '' }) {
  if (value > 0) {
    return <span className="text-[10px] font-medium text-green-600">▲ +{value}{suffix}</span>
  }
  if (value < 0) {
    return <span className="text-[10px] font-medium text-red-500">▼ {value}{suffix}</span>
  }
  return <span className="text-[10px] font-medium text-gray-400">▬ Stable</span>
}
