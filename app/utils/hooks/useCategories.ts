import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
};

export default function useCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then(setCategories)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}
