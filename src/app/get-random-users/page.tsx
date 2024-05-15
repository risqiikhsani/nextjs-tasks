import React from 'react';

export default async function Page(){
  const response = await fetch(`${process.env.URL}/api/random-users`, { cache: 'no-store' });
  const dynamicData = await response.json();

  return (
    <>
      {/* You can render the dynamic data here */}
      <pre>{JSON.stringify(dynamicData, null, 2)}</pre>
    </>
  );
};

