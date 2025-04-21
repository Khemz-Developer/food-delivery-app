import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
    const { refetch, data: categories = [] } = useQuery({
        queryKey: "categories",
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/menu/count-each-category");
            return res.json();
        }
    });

    return [categories, refetch];
}

export default useCategory;
