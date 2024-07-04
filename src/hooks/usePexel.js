import { useState, useEffect } from 'react';
import axios from 'axios';

const usePexel = (typeItem, typeSearch, query) => {
    const [items, setItems] = useState([]); // State lưu trữ item (video,img,collect)
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [activeTab, setActiveTab] = useState('typeItem');
    const apiKey = 'IOduAJDREt7mMPT0xfjHQCeGaMWhHS5rYmTrsghYiIVT9H8zKCq0rNRg';

    useEffect(() => {
        const queryPexel = query
            ? `https://api.pexels.com/${typeItem}/${typeSearch}?query=${query}`
            : `https://api.pexels.com/${typeItem}/${typeSearch}/`;
        setLoading(true);
        const fetchItems = async () => {
            try {
                const response = await axios.get(queryPexel, {
                    headers: {
                        Authorization: apiKey,
                    },
                    params: {
                        page: '1',
                        per_page: 20,
                    },
                });
                if (response !== items) {
                    setItems(typeItem === 'videos' ? response.data.videos : response.data.photos);
                    setLoading(false);
                }
            } catch (error) {
                console.error(`Error fetching ${typeItem} from Pexels`, error);
                setItems([]);
                setLoading(false);
            }
        };

        fetchItems();
        setActiveTab(typeItem);
    }, [typeItem, typeSearch, query]);
    return { items, loading, activeTab }; // Return the items and loading state
};

export default usePexel;
