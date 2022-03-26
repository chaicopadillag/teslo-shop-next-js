import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DashboardLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { productController } from '../../../app/controllers';
import { tesloApi } from '../../../services';
import { Product } from '../../../app/models';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug = value.title?.trim().replace(/[0-9]/g, '').replaceAll(' ', '-').replaceAll("'", '').toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onChangeSize = (size: string) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onDeleteTag = (tag: string) => {
    const currentTags = getValues('tags');
    setValue(
      'tags',
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  const onSetTag = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentTags = getValues('tags');
      if (currentTags.includes(newTagValue)) {
        return;
      }

      setValue('tags', [...currentTags, newTagValue], { shouldValidate: true });
      setNewTagValue('');
    }
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      // console.log( file );
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await tesloApi.post<{ message: string }>('/dashboard/upload', formData);
        setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert('Mínimo 2 imagenes');
    setIsSaving(true);
    // console.log(form);
    try {
      await tesloApi({
        url: '/dashboard/product',
        method: form._id ? 'PUT' : 'POST', // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      // console.log({ data });
      if (!form._id) {
        router.replace(`/dashboard/product/${form.slug}`);
      }
      setIsSaving(false);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout title={'Producto'} subTitle={`Editando: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button color='secondary' startIcon={<SaveOutlined />} sx={{ width: '150px' }} disabled={isSaving} type='submit'>
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Título'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Este campo es requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label='Descripción'
              variant='filled'
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Inventario'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo 0' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label='Precio'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo 0' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup row value={getValues('type')} onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}>
                {validTypes.map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio color='secondary' />} label={capitalize(option)} />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup row value={getValues('gender')} onChange={({ target }) => setValue('gender', target.value, { shouldValidate: true })}>
                {validGender.map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio color='secondary' />} label={capitalize(option)} />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel key={size} control={<Checkbox checked={getValues('sizes').includes(size)} onChange={() => onChangeSize(size)} />} label={size} />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Este campo es requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                validate: (slug) => (slug.match(/^[a-z-]+$/i) ? undefined : 'Sólo letras y números'),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label='Etiquetas'
              onKeyDown={onSetTag}
              value={newTagValue}
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              onChange={({ target }) => setNewTagValue(target.value)}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component='ul'
            >
              {getValues('tags').map((tag) => {
                return <Chip key={tag} label={tag} onDelete={() => onDeleteTag(tag)} color='primary' size='small' sx={{ ml: 1, mt: 1 }} />;
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button onClick={() => fileInputRef.current?.click()} color='secondary' fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                Cargar imagen
              </Button>
              <input ref={fileInputRef} type='file' multiple accept='image/png, image/gif, image/jpeg' style={{ display: 'none' }} onChange={onFilesSelected} />

              {getValues('images').length < 2 ? (
                <Chip label='Es necesario al 2 imagenes' color='error' variant='outlined' />
              ) : (
                <Grid container spacing={2}>
                  {getValues('images').map((img) => (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia component='img' className='fadeIn' image={img} alt={img} />
                        <CardActions>
                          <Button fullWidth color='error' onClick={() => onDeleteImage(img)}>
                            Borrar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query as { slug: string };
  let product: IProduct | null = null;

  if (slug === 'create') {
    const temProd = JSON.parse(JSON.stringify(new Product()));
    delete temProd._id;
    temProd.images = [];
    product = temProd;
  } else {
    product = await productController.getProductBySlug(slug);
  }

  if (!product) {
    return {
      redirect: {
        destination: '/dashboard/product',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: {
        ...product,
        images: product.images.map((image) => (image.includes('https://') ? image : `${process.env.APP_URL}/products/${image}`)),
      },
    },
  };
};

export default ProductAdminPage;
