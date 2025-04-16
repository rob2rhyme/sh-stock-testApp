import { ProductCategory } from '../components/types';

// Import your JSON data files
import gb15k from '../data/gb-15k.json';
import gb25k from '../data/gb-25k.json';
import cali8k from '../data/cali-8k.json';
import cali20k from '../data/cali-20k.json';
import yovo18k from '../data/yovo-18k.json';
import yovo8k from '../data/Yovo-8k.json';
import fogerFull from '../data/Foger-full.json';
import fogerPodOnly from '../data/FogerPodOnly.json';
import Raz25K from '../data/Raz-25K.json';

export const fetchAllData = async (): Promise<Record<string, ProductCategory>> => {
  const data: Record<string, ProductCategory> = {};

  const processFile = (fileData: any, categoryName: string) => {
    const products = fileData[categoryName] || [];
    return {
      name: categoryName,
      products: products.map((product: any) => ({
        ...product,
        store: Number(product.store) || 0,
        home: Number(product.home) || 0
      }))
    };
  };

  data['GeekBar 15K'] = processFile(gb15k, 'geekbar15k');
  data['GeekBar 25K'] = processFile(gb25k, 'geekbar25k');
  data['Yovo 8K'] = processFile(yovo8k, 'Yovo-8k');
  data['Yovo Ultra 18K'] = processFile(yovo18k, 'Yovo-18k');
  data['Raz 25K'] = processFile(Raz25K, 'Raz-25K');
  // data['Cali 8K'] = processFile(cali8k, 'cali8k');
  // data['Cali 20K'] = processFile(cali20k, 'cali20k');
  // data['Foger Full'] = processFile(fogerFull, 'FogerFull');
  // data['Foger Pod Only'] = processFile(fogerPodOnly, 'FogerPodOnly');

  return data;
};
