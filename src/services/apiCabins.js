import supabase from "./supabase"

export async function getCabins(){
    let { data, error } = await supabase
    .from('cabins')
    .select('*')

    if(error){
        console.error(error);
        throw new Error("Cabins could not be loaded")
    }

    return data;
}

export async function createEditCabin(newcabin, id){
  const hasImagePath = newcabin.image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
  
  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll("/", "");
  const imagePath =  hasImagePath ? newcabin.image : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

  //1. create/edit a cabin
  let query = supabase.from('cabins')

  //A. CREATE
  if(!id){
   query = query.insert([{...newcabin, image: imagePath}])
  }

  //B. EDIT
  if(id){
    query = query.update({ ...newcabin, image: imagePath }).eq("id", id);
  }
  
  const {data, error} = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  //2. upload the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);

   // 3. Delete the cabin IF there was an error uplaoding image
   if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted!");
    }
  
    return data;
  }