import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { messagesService } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const DEFAULT_MESSAGE = 'Hola, me interesa esta publicación. ¿Sigue disponible?';

function MessagesPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [thread, setThread] = useState([]);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [loading, setLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [threadError, setThreadError] = useState('');
  const [feedback, setFeedback] = useState('');

  const publicationParam = searchParams.get('publication');
  const userParam = searchParams.get('user');

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await messagesService.getConversations();
        const items = response.data || [];
        setConversations(items);

        if (publicationParam && userParam) {
          const matched = items.find(
            (item) =>
              Number(item.publication_id) === Number(publicationParam) &&
              Number(item.counterpart_id) === Number(userParam),
          );

          if (matched) {
            setSelectedConversation(matched);
            setMessage('');
            return;
          }

          setSelectedConversation({
            publication_id: Number(publicationParam),
            counterpart_id: Number(userParam),
            publication_title: 'Publicación seleccionada',
            counterpart_name: 'Vendedor',
          });
          return;
        }

        if (items.length > 0) {
          setSelectedConversation(items[0]);
          setMessage('');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudieron cargar las conversaciones.');
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [publicationParam, userParam]);

  useEffect(() => {
    const loadThread = async () => {
      if (!selectedConversation?.publication_id || !selectedConversation?.counterpart_id) {
        setThread([]);
        return;
      }

      try {
        setThreadLoading(true);
        setThreadError('');
        const response = await messagesService.getThread(
          selectedConversation.publication_id,
          selectedConversation.counterpart_id,
        );
        setThread(response.data || []);
      } catch (err) {
        setThreadError(err.response?.data?.message || 'No se pudo cargar la conversación.');
      } finally {
        setThreadLoading(false);
      }
    };

    loadThread();
  }, [selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearchParams({ publication: conversation.publication_id, user: conversation.counterpart_id });
    setFeedback('');
    setMessage('');
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!selectedConversation?.publication_id || !selectedConversation?.counterpart_id) {
      setThreadError('Debes seleccionar una conversación antes de responder.');
      return;
    }

    if (!message.trim()) {
      setThreadError('Debes escribir un mensaje antes de enviarlo.');
      return;
    }

    try {
      setSending(true);
      setThreadError('');
      setFeedback('');

      const response = await messagesService.create({
        receiver_id: selectedConversation.counterpart_id,
        publication_id: selectedConversation.publication_id,
        message: message.trim(),
      });

      const created = response.data?.data;
      if (created) {
        setThread((current) => [
          ...current,
          {
            ...created,
            sender_name: user?.name,
            sender_email: user?.email,
            receiver_name: selectedConversation.counterpart_name,
            publication_title: selectedConversation.publication_title,
          },
        ]);
      }

      const updatedConversation = {
        ...selectedConversation,
        message: message.trim(),
        direction: 'sent',
        created_at: new Date().toISOString(),
      };

      setSelectedConversation(updatedConversation);
      setConversations((current) => {
        const filtered = current.filter(
          (item) =>
            !(
              Number(item.publication_id) === Number(updatedConversation.publication_id) &&
              Number(item.counterpart_id) === Number(updatedConversation.counterpart_id)
            ),
        );
        return [updatedConversation, ...filtered];
      });
      setFeedback('Respuesta enviada correctamente.');
      setMessage('');
    } catch (err) {
      setThreadError(err.response?.data?.message || 'No fue posible enviar el mensaje.');
    } finally {
      setSending(false);
    }
  };

  const selectedTitle = useMemo(() => {
    if (!selectedConversation) return 'Selecciona una conversación';
    return `${selectedConversation.publication_title || 'Publicación'} · ${selectedConversation.counterpart_name || 'Usuario'}`;
  }, [selectedConversation]);

  if (loading) {
    return <div className='alert alert-info'>Cargando mensajes...</div>;
  }

  if (error) {
    return <div className='alert alert-danger'>{error}</div>;
  }

  return (
    <section>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h1 className='h3 fw-bold mb-1'>Mensajes</h1>
          <p className='text-body-secondary mb-0'>Revisa consultas y responde directamente desde cada conversación.</p>
        </div>
      </div>

      <div className='row g-4'>
        <div className='col-lg-4'>
          {!conversations.length ? (
            <EmptyState
              title='Aún no tienes conversaciones activas'
              description='Cuando contactes a un vendedor o recibas consultas, verás aquí cada conversación agrupada por publicación.'
            />
          ) : (
            <div className='d-grid gap-3'>
              {conversations.map((item) => {
                const isActive =
                  Number(item.publication_id) === Number(selectedConversation?.publication_id) &&
                  Number(item.counterpart_id) === Number(selectedConversation?.counterpart_id);

                return (
                  <button
                    type='button'
                    key={`${item.publication_id}-${item.counterpart_id}`}
                    className={`card text-start border-0 shadow-sm rounded-4 ${isActive ? 'border border-primary' : ''}`}
                    onClick={() => handleSelectConversation(item)}
                  >
                    <div className='card-body p-3'>
                      <div className='small text-body-secondary mb-1'>{item.publication_title}</div>
                      <div className='fw-semibold mb-1'>{item.counterpart_name}</div>
                      <div className='small text-body-secondary text-truncate mb-2'>{item.message}</div>
                      <div className='small text-body-secondary'>
                        {item.created_at ? new Date(item.created_at).toLocaleString('es-CL') : 'Fecha no disponible'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className='col-lg-8'>
          <div className='card border-0 shadow-sm rounded-4 h-100'>
            <div className='card-body p-4'>
              <div className='d-flex justify-content-between align-items-start gap-3 mb-4'>
                <div>
                  <h2 className='h4 mb-1'>{selectedTitle}</h2>
                  {selectedConversation?.publication_id ? (
                    <Link className='small' to={`/publicaciones/${selectedConversation.publication_id}`}>
                      Ver publicación
                    </Link>
                  ) : null}
                </div>
              </div>

              {threadError ? <div className='alert alert-danger'>{threadError}</div> : null}
              {feedback ? <div className='alert alert-success'>{feedback}</div> : null}

              {!selectedConversation ? (
                <EmptyState
                  title='Selecciona una conversación'
                  description='Elige una conversación de la lista para revisar el historial y responder.'
                />
              ) : threadLoading ? (
                <div className='alert alert-info'>Cargando conversación...</div>
              ) : (
                <>
                  <div className='d-grid gap-3 mb-4'>
                    {thread.length ? (
                      thread.map((item) => {
                        const isMine = Number(item.sender_id) === Number(user?.id);
                        return (
                          <div key={item.id} className={`d-flex ${isMine ? 'justify-content-end' : 'justify-content-start'}`}>
                            <div className={`rounded-4 p-3 ${isMine ? 'bg-primary text-white' : 'bg-body-tertiary'}`} style={{ maxWidth: '80%' }}>
                              <div className='small fw-semibold mb-1'>
                                {isMine ? 'Tú' : item.sender_name}
                              </div>
                              <div>{item.message}</div>
                              <div className={`small mt-2 ${isMine ? 'text-white-50' : 'text-body-secondary'}`}>
                                {item.created_at ? new Date(item.created_at).toLocaleString('es-CL') : 'Fecha no disponible'}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className='alert alert-warning mb-0'>
                        Aún no hay mensajes en esta conversación. Puedes iniciar el contacto desde aquí.
                      </div>
                    )}
                  </div>

                  <form className='border rounded-4 p-3 bg-body-tertiary' onSubmit={handleSendMessage}>
                    <label htmlFor='replyMessage' className='form-label fw-semibold'>
                      {thread.length ? 'Responder conversación' : 'Enviar primer mensaje'}
                    </label>
                    <textarea
                      id='replyMessage'
                      className='form-control'
                      rows='4'
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder='Escribe aquí tu mensaje'
                    />
                    <div className='d-flex justify-content-end mt-3'>
                      <button type='submit' className='btn btn-primary' disabled={sending}>
                        {sending ? 'Enviando...' : thread.length ? 'Responder' : 'Enviar mensaje'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
