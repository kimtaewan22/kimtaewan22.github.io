import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useSectionBg(sectionId) {
  const [bgUrl, setBgUrl] = useState('');
  useEffect(() => {
    const fetchBg = async () => {
      const docRef = doc(db, 'backgrounds', sectionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setBgUrl(docSnap.data().imageUrl);
    };
    fetchBg();
  }, [sectionId]);
  return bgUrl;
} 