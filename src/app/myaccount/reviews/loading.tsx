import ReviewLoading from '@/components/global/ReviewLoading';

function loading() {
    return (
        <section className='flex flex-col gap-8'>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Reviews</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage and view all your product reviews</p>
            </div>

            <ReviewLoading />
            <ReviewLoading />
        </section>
    );
}

export default loading;