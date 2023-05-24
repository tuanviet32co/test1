import { Button, Input, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { logOut, updateUserProfile } from '~/services';
import { UserContext } from '../degree';
import BackgroundImage from '~/assets/background_settings.png';

const InputConfirm = ({ fieldKey, label, defaultValue, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleEdit = () => {
    setValue(defaultValue);
    setIsEdit(true);
  }

  const handleCancel = () => {
    setValue(defaultValue);
    setIsEdit(false);
  }

  const handleSave = () => {
    onUpdate(fieldKey, value);
    setIsEdit(false);
  }

  return (
    <div className='mt-5'>
      <div className='mb-2'>{label}</div>
      {isEdit ?
        <div className='flex w-full gap-2'>
          <Input
            defaultValue={defaultValue}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <Button onClick={handleCancel} >
            Cancel
          </Button>
          <Button onClick={handleSave} type="primary" className=' bg-green-500' >
            Save
          </Button>
        </div>
        :
        <div className='flex w-full gap-2'>
          <Input
            defaultValue={defaultValue}
            value={defaultValue}
            disabled
          />
          <Button onClick={handleEdit} type="primary">
            Edit
          </Button>
        </div>
      }
    </div>
  )
}

function Settings() {
  const { majorOptions, profile, setProfile } = useContext(UserContext);

  const {
    email,
    name,
    major,
    minor,
    studentId,
    graduationYear,
  } = profile;

  const handleUpdate = async (key, value) => {
    const res = await updateUserProfile({ key, value });
    setProfile(p => ({ ...p, [key]: res }));
  }

  return (
    <div
      className='bg-cover bg-center min-h-screen flex justify-center'
      style={{
        backgroundImage: `url(${BackgroundImage})`
      }}
    >
      <div className='bg-white p-12 m-12 rounded-3xl w-4/5 max-w-[600px]'>
        <div className='mt-5'>
          <div className='mb-2'>Email</div>
          <div className=' text-first-default'>{email}</div>
        </div>

        <div className='mt-5'>
          <div className='mb-2'>Student Id</div>
          <div className=' text-first-default'>{studentId}</div>
        </div>

        <InputConfirm
          fieldKey="name"
          label="Name"
          defaultValue={name}
          onUpdate={handleUpdate}
        />

        <InputConfirm
          fieldKey="graduationYear"
          label="Graduation Year"
          defaultValue={graduationYear}
          onUpdate={handleUpdate}
        />
        <div className='mt-5'>
          <div className='mb-2'>Major</div>
          <Select
            className='w-full'
            value={major?._id}
            placeholder="Select a major"
            optionFilterProp="children"
            onChange={(v) => handleUpdate('major', v)}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={majorOptions.filter(v => v.label !== 'Core')}
          />
        </div>
        <div className='mt-5'>
          <div className='mb-2'>Minor</div>
          <Select
            className='w-full'
            value={minor?._id}
            placeholder="Select a minor"
            optionFilterProp="children"
            onChange={(v) => handleUpdate('minor', v)}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={majorOptions.filter(v => v.label !== 'Core')} />
        </div>
        <div className='mt-10'>
          <Button onClick={logOut}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;