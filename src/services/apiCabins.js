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

export async function createCabin(newcabin){

  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll("/", "");

  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

  //1. create a cabin
  const { data, error } = await supabase
  .from('cabins')
  .insert([{...newcabin, image: imagePath}])
  .select()

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  //2. upload the image
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