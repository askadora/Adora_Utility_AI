"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    type: 'personal' | 'professional';
    attendees?: string;
    meetingType?: string;
    relatedConversation?: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [calendarType, setCalendarType] = useState<'play' | 'pro'>('play');
  // Ref for the toggle container
  const toggleRef = useRef<HTMLDivElement>(null);

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    // Get today's date for "Today" events
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    
    // Get tomorrow's date for "Tomorrow" events  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().split('T')[0];
    
    // Get day after tomorrow for "2 days out" events
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const dayAfterTomorrowISO = dayAfterTomorrow.toISOString().split('T')[0];

    // Initialize with AdoraLink meetings + additional events
    setEvents([
      // AdoraLink Professional Meetings
      {
        id: 'adoralink-1',
        title: 'Security Review Meeting',
        start: `${todayISO}T14:00:00`, // Today 2:00 PM
        end: `${todayISO}T15:00:00`,   // 1 hour
        extendedProps: { 
          calendar: 'Danger', 
          type: 'professional',
          attendees: 'Brandon Philips, Security Team',
          meetingType: 'urgent',
          relatedConversation: '1'
        },
      },
      {
        id: 'adoralink-2',
        title: 'Q4 Budget Planning',
        start: `${tomorrowISO}T10:00:00`, // Tomorrow 10:00 AM
        end: `${tomorrowISO}T12:00:00`,   // 2 hours
        extendedProps: { 
          calendar: 'Primary', 
          type: 'professional',
          attendees: 'Terry Franci, Finance Team',
          meetingType: 'business',
          relatedConversation: '3'
        },
      },
      {
        id: 'adoralink-3',
        title: 'Dev Team Standup',
        start: `${dayAfterTomorrowISO}T09:00:00`, // 2 days out 9:00 AM
        end: `${dayAfterTomorrowISO}T09:30:00`,   // 30 minutes
        extendedProps: { 
          calendar: 'Success', 
          type: 'professional',
          attendees: 'Alena Franci, Engineering',
          meetingType: 'routine',
          relatedConversation: '4'
        },
      },
      // Additional sample events
      {
        id: '4',
        title: 'Doctor Appointment',
        start: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        extendedProps: { calendar: 'Warning', type: 'personal' },
      },
      {
        id: '5',
        title: 'Family Dinner',
        start: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        extendedProps: { calendar: 'Primary', type: 'personal' },
      },
      {
        id: '6',
        title: 'Yoga Class',
        start: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
        extendedProps: { calendar: 'Success', type: 'personal' },
      },
    ]);
  }, []);

  // Filter events based on calendarType
  const filteredEvents = events.filter(event =>
    calendarType === 'play'
      ? event.extendedProps.type === 'personal'
      : event.extendedProps.type === 'professional'
  );

  // Effect to inject the toggle into the FullCalendar header
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;
    // Wait for the DOM to update
    setTimeout(() => {
      const header = document.querySelector('.fc-header-toolbar .fc-toolbar-chunk:last-child');
      if (header && toggleRef.current && !header.contains(toggleRef.current)) {
        header.appendChild(toggleRef.current);
      }
      // Add custom class to Add Event button for styling
      const addEventBtn = document.querySelector('.fc-addEventButton-button');
      if (addEventBtn) {
        addEventBtn.classList.add('fc-add-event-btn');
      }
    }, 0);
  }, [calendarType]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: eventLevel, type: selectedEvent.extendedProps.type },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel, type: calendarType === 'play' ? 'personal' : 'professional' },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="listDay"
          views={{
            listDay: {
              type: 'list',
              duration: { days: 1 },
              listDayFormat: false,
              listDaySideFormat: false,
              noEventsContent: 'No events scheduled for today'
            }
          }}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'addEventButton listDay,timeGridWeek,dayGridMonth',
          }}
          events={filteredEvents}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: 'Add Event +',
              click: openModal,
            },
          }}
          dayMaxEvents={false}
          height="auto"
          contentHeight="auto"
        />
        {/* Toggle injected into the header via ref */}
        <div ref={toggleRef} style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 16, verticalAlign: 'middle', height: '100%' }}>
          <span className={calendarType === 'play' ? 'text-green-500 font-semibold' : 'text-gray-400'}>Play</span>
          <label className="relative inline-flex items-center cursor-pointer mx-2">
            <input
              type="checkbox"
              checked={calendarType === 'pro'}
              onChange={e => setCalendarType(e.target.checked ? 'pro' : 'play')}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 dark:bg-gray-700 rounded-full peer transition-all ${
              calendarType === 'pro' 
                ? 'peer-focus:ring-indigo-500 dark:peer-focus:ring-indigo-800 peer-checked:bg-indigo-500' 
                : 'peer-focus:ring-green-500 dark:peer-focus:ring-green-800 bg-green-500'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white dark:bg-gray-900 w-4 h-4 rounded-full shadow transition-all ${
              calendarType === 'pro' ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </label>
          <span className={(calendarType === 'pro' ? 'text-indigo-500 font-semibold' : 'text-gray-400') + ' pr-6'}>Pro</span>
        </div>
      </div>
      <style>{`
        .fc-add-event-btn {
          color: #fff !important;
          background: #6366f1 !important; /* fallback to your brand color */
          border: none !important;
        }
        .fc-add-event-btn:hover, .fc-add-event-btn:focus {
          background: #4f46e5 !important;
        }
        
        /* Custom Day List View Styling - App Theme Consistent */
        .fc-list-day-cushion {
          display: none !important;
        }
        .fc-list-event {
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          margin: 12px 0 !important;
          padding: 16px !important;
          background: #ffffff !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
          transition: all 0.2s ease !important;
        }
        .dark .fc-list-event {
          border-color: #374151 !important;
          background: #1f2937 !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1) !important;
        }
        .fc-list-event:hover {
          background: #f9fafb !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border-color: #d1d5db !important;
        }
        .dark .fc-list-event:hover {
          background: #253548 !important;
          border-color: #4b5563 !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important;
        }
        .fc-list-event-time {
          font-weight: 600 !important;
          color: #3b82f6 !important;
          font-size: 14px !important;
          min-width: 70px !important;
        }
        .fc-list-event-title {
          font-weight: 500 !important;
          color: #1f2937 !important;
          font-size: 16px !important;
          margin-left: 12px !important;
          flex: 1 !important;
        }
        .dark .fc-list-event-title {
          color: #f9fafb !important;
        }
        .fc-list-event-title::after {
          content: attr(data-attendees) !important;
          display: block !important;
          font-size: 12px !important;
          font-weight: 400 !important;
          color: #6b7280 !important;
          margin-top: 2px !important;
        }
        .dark .fc-list-event-title::after {
          color: #9ca3af !important;
        }
        .fc-list-empty {
          text-align: center !important;
          padding: 40px !important;
          color: #6b7280 !important;
          font-style: italic !important;
        }
        .fc-list-table {
          border: none !important;
        }
        .fc-list-day-text {
          display: none !important;
        }
      `}</style>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Edit Event" : "Add Event"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Plan your next big moment: schedule or edit an event to stay on
              track
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Title
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Color
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {Object.entries(calendarsEvents).map(([key, value]) => (
                  <div key={key} className="n-chk">
                    <div
                      className={`form-check form-check-${value} form-check-inline`}
                    >
                      <label
                        className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                        htmlFor={`modal${key}`}
                      >
                        <span className="relative">
                          <input
                            className="sr-only form-check-input"
                            type="radio"
                            name="event-level"
                            value={key}
                            id={`modal${key}`}
                            checked={eventLevel === key}
                            onChange={() => setEventLevel(key)}
                          />
                          <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                            <span
                              className={`h-2 w-2 rounded-full bg-white ${
                                eventLevel === key ? "block" : "hidden"
                              }`}  
                            ></span>
                          </span>
                        </span>
                        {key}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter Start Date
              </label>
              <div className="relative">
                <input
                  id="event-start-date"
                  type="date"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter End Date
              </label>
              <div className="relative">
                <input
                  id="event-end-date"
                  type="date"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleAddOrUpdateEvent}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {selectedEvent ? "Update Changes" : "Add Event"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  const isListView = eventInfo.view.type === 'listDay';
  
  if (isListView) {
    return (
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {eventInfo.event.title}
          </h4>
          {eventInfo.event.extendedProps.attendees && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {eventInfo.event.extendedProps.attendees}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              📅 {eventInfo.timeText}
            </span>
            {eventInfo.event.start && eventInfo.event.end && (
              <span className="flex items-center gap-1">
                ⏱️ {Math.round((eventInfo.event.end.getTime() - eventInfo.event.start.getTime()) / (1000 * 60 * 60))} hour{Math.round((eventInfo.event.end.getTime() - eventInfo.event.start.getTime()) / (1000 * 60 * 60)) !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          {eventInfo.event.extendedProps.meetingType && (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              eventInfo.event.extendedProps.meetingType === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
              eventInfo.event.extendedProps.meetingType === 'business' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
            }`}>
              {eventInfo.event.extendedProps.meetingType}
            </span>
          )}
          {eventInfo.event.extendedProps.relatedConversation && (
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
              💬 View Chat
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
