import supabase from './supabaseClient.js';

async function createProfilePhotosBucket() {
  try {
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('profile-photos', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (error) {
      console.error('Error creating bucket:', error);
      return;
    }

    console.log('Bucket created successfully:', data);

    // Set up public policies
    const { error: policyError } = await supabase.storage.from('profile-photos').createPolicy(
      'Public Access',
      {
        roles: ['anon', 'authenticated'],
        permissions: {
          read: true,
          write: false,
        }
      }
    );

    if (policyError) {
      console.error('Error creating policy:', policyError);
    } else {
      console.log('Public policy created successfully');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

createProfilePhotosBucket();
