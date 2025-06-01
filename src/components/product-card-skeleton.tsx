import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="flex max-h-[656px] min-h-[656px] max-w-[696px] min-w-[696px] flex-col rounded-lg p-1">
      <Skeleton className="h-[520px] w-full rounded-lg" />
      <div className="flex justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-14 w-14 rounded-md" />
      </div>
    </div>
  )
}
