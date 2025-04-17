import { ProductCategory } from '../components/types';

// Import your JSON data files
import gb15k from '../data/gb-15k.json';
import gb25k from '../data/gb-25k.json';
import lostMary20k from '../data/LostMary-20k.json';
import cali8k from '../data/cali-8k.json';
import cali20k from '../data/cali-20k.json';
import yovo18k from '../data/Yovo-18k.json';
import yovo8k from '../data/Yovo-8k.json';
import fogerFull from '../data/Foger-full.json';
import fogerPodOnly from '../data/FogerPodOnly.json';
import raz25k from '../data/Raz-25k.json';
import rama16k from '../data/rama-16k.json';
import viho20k from '../data/viho-20k.json';
import northVision15k from '../data/northVision-15k.json';

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

  data['Cali 8K'] = processFile(cali8k, 'cali8k');
data['Cali 20K'] = processFile(cali20k, 'cali20k');
data['GeekBar 15K'] = processFile(gb15k, 'geekbar15k');
data['GeekBar 25K'] = processFile(gb25k, 'geekbar25k');
data['Lost Mary 20K'] = processFile(lostMary20k, 'lostMary20k');
data['North Vision 15K'] = processFile(northVision15k, 'northVision-15k');
data['RAMA 16K'] = processFile(rama16k, 'rama16k');
data['Raz 25k'] = processFile(raz25k, 'raz25k');
data['VIHO 20K'] = processFile(viho20k, 'viho20k');
data['Yovo 8K'] = processFile(yovo8k, 'Yovo-8k');
data['Yovo Ultra 18K'] = processFile(yovo18k, 'Yovo-18k');
  // data['Foger Full'] = processFile(fogerFull, 'FogerFull');
  // data['Foger Pod Only'] = processFile(fogerPodOnly, 'FogerPodOnly');

  return data;
};
