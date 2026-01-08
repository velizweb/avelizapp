
export default function StatsCard({ 
    approved, 
    pending, 
    rejected, 
    total 
}: { 
    approved: number, 
    pending: number, 
    rejected: number, 
    total: number 
}) {

    const stats = [
        {
            label: "Total",
            count: total,
            color: "bg-fuchsia-500/10"
        },
        {
            label: "Pending",
            count: pending,
            color: "bg-yellow-500/10"
        },
        {
            label: "Approved",
            count: approved,
            color: "bg-green-500/10"
        },
        {
            label: "rejected",
            count: rejected,
            color: "bg-red-500/10"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(stat => (
                <div key={stat.label} className={`${stat.color} border border-fuchsia-400 p-8 flex flex-col items-start rounded-lg hover:shadow-sm hover:shadow-fuchsia-500 transition-shadow`}>
                    <p className="text-sm text-primary mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.count}</p>
                </div>
            ))}

        </div>
    )
}
