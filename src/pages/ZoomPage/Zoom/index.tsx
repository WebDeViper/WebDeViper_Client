import { Socket } from 'socket.io-client';
import { GetTimer, GetUser } from '../type';
import React, { useEffect, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '../../../store/store';
import Video from './Video';
import { v4 as uuidV4 } from 'uuid';

interface Props {
  users: GetUser[];
  socket: Socket | null;
}

type PeerType = {
  peerId: string;
  stream: MediaStream;
};

export default function Zoom({ users, socket }: Props) {
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerType[]>([]);

  const userInfo = useAppSelector(state => state.user.userInfo);

  useEffect(() => {
    const meId = userInfo.id;
    const peer = new Peer(meId);
    console.log(meId, 'meId');
    setMyPeer(peer);
  }, [userInfo]);

  useEffect(() => {
    if (!socket) return;
    if (!myPeer) return;

    myPeer.on('open', (peerId: string) => {
      console.log(peerId, 'peerPeerId');
      // socket.connect();
      socket.emit('zoomJoin', peerId);
    });
  }, [myPeer, socket]);

  useEffect(() => {
    if (!socket) return;
    if (!myPeer) return;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(stream => {
        setStream(stream);

        myPeer.on('call', call => {
          call.answer(stream);
          call.on('stream', userVideoStream => {
            // setPeers(prev => [...prev, { peerId: call.peer, stream: userVideoStream }]);
            setPeers(prev => {
              const isDuplicate = prev.some(item => item.peerId === call.peer);
              if (isDuplicate) {
                return prev;
              } else {
                return [...prev, { peerId: call.peer, stream: userVideoStream }];
              }
            });
            // console.log(userVideoStream, 'stream userVideoStream');
            console.log('어디서 추가하니??');
          });
        });

        socket.on('user-connected', (peerId: string) => {
          console.log(peerId, 'socket event');
          // setPeers(prev => [...prev, { peerId, stream }]);
          const call = myPeer.call(peerId, stream);
          if (call) {
            call.on('stream', userVideoStream => {
              console.log('어디서 추가하니?? 여기니??');
              // console.log(userVideoStream, 'userVideoStream');
              // setPeers(prev => [...prev, { peerId, stream: userVideoStream }]);
              setPeers(prev => {
                const isDuplicate = prev.some(item => item.peerId === call.peer);
                if (isDuplicate) {
                  return prev;
                } else {
                  return [...prev, { peerId, stream: userVideoStream }];
                }
              });
            });
          }
        });
      });

    return () => {
      socket.off('user-connected');
    };
  }, [socket, myPeer]);

  // useEffect(() => {
  //   if (!myPeer) return;
  //   if (!stream) return;

  //   myPeer.on('call', call => {
  //     call.answer(stream);
  //     call.on('stream', userVideoStream => {
  //       setPeers(prev => [...prev, { peerId: call.peer, stream: userVideoStream }]);
  //     });
  //   });
  //   return () => {
  //     myPeer.off('call');
  //   };
  // }, [myPeer, stream]);

  useEffect(() => {
    if (!socket) return;
    socket.on('user-connected', (peerId: string) => {
      console.log(peerId, '이벤트22');
    });
  }, [socket]);

  console.log(peers, 'peers');

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit('setTimer');
  //   socket.on('getTimer', (res: GetTimer[]) => {
  //     console.log(res);
  //   });
  // }, [socket]);

  useEffect(() => {}, []);
  return (
    <div className="h-full">
      {/* <div className="h-full bg-gray-900">
        <div className="p-10 grid grid-cols-3 gap-5">
          {users &&
            users.map((user: GetUser) => (
              <div key={user.userId} className="relative h-60">
                <div className="w-full h-full">
                  <img
                    className="w-full h-full"
                    src={import.meta.env.VITE_APP_BACK_URL + user.userProfile}
                    alt="프로필 이미지"
                  />
                </div>
                <div>{user.userNickName}</div>
              </div>
            ))}
        </div>
      </div> */}
      <Video stream={stream} />
      {peers && peers.map(peer => <Video key={peer.peerId} stream={peer.stream} />)}
    </div>
  );
}

// export const MemoizedZoom = React.memo(Zoom);
