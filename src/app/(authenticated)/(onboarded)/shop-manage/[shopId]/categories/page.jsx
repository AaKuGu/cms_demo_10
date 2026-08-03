import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllCategories } from '@/SSRCalls/Category.ssrCalls';
import { logConsole } from '@/lib/console/console';
import NewCategoryContainer from './NewCategoryContainer';
import CategoryList from './CategoryList';

export default async function CategoriesPage({ params }) {
    const { shopId } = await params;
    logConsole('categories page : shopId ', shopId);

    const { data: categories = [], error } = await fetchAllCategories({ shopId });
    logConsole('categories page : categories ', categories);

    if (error) {
        logConsole('categories page : error ', error);
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Categories"
                description={`Manage categories for shop ${shopId}`}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <NewCategoryContainer shopId={shopId} />

                {categories.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                        No categories found for this shop.
                    </div>
                ) : (
                    <CategoryList categories={categories} shopId={shopId} />
                )}
            </div>
        </div>
    );
}
