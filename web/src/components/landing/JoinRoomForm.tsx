import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { COPY } from '../../lib/copy';
import { ROOM_CODE_REGEX, ROOM_CODE_LENGTH } from '../../lib/constants';
import { formatRoomCode } from '../../lib/utils';

export function JoinRoomForm() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (v: string) => {
    const upper = v.toUpperCase().replace(/[^23456789ABCDEFGHJKMNPQRSTUVWXYZ]/g, '');
    setCode(upper);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = formatRoomCode(code);
    if (!ROOM_CODE_REGEX.test(formatted)) {
      setError(COPY['landing.code.invalid']);
      return;
    }
    navigate(`/r/${formatted}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={handleChange}
          placeholder={COPY['landing.code.placeholder']}
          ariaLabel="Room code"
          maxLength={ROOM_CODE_LENGTH}
        />
        <Button variant="secondary" type="submit" disabled={code.length !== ROOM_CODE_LENGTH}>
          {COPY['landing.join']}
        </Button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}