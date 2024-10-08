'use client';

import React, { useState, useEffect, useRef } from 'react';
import contacts from './contactData.json';

const groupedContacts = contacts.reduce((acc, contact) => {
  const { group } = contact;
  if (!acc[group]) acc[group] = [];
  acc[group].push(contact);
  return acc;
}, {});

const ContactList = () => {
  const [visibleGroups, setVisibleGroups] = useState([]); // For storing the cumulative groups
  const [scrollDirection, setScrollDirection] = useState('down');
  const groupRefs = useRef({}); // Refs to track each group's position
  const headerRef = useRef();

  // Intersection observer to detect which group headers are in view
  useEffect(() => {
    let lastScrollTop = headerRef.current.scrollTop;
    const handleScroll = (e) => {
      let element = e.target;
      const currentScrollTop = element.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        //   console.log('Scrolling down');
        setScrollDirection('down');
      } else if (currentScrollTop < lastScrollTop) {
        //   console.log('Scrolling up');
        setScrollDirection('up');
      } else {
        //   console.log('No scroll direction change'); // Handle stationary case if needed
      }

      lastScrollTop = currentScrollTop; // Update lastScrollTop to the new position
    };
    headerRef.current.addEventListener('scroll', handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        const groupsInView = new Set();
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            groupsInView.add(entry.target.dataset.group);
            console.log(entry.target.dataset.group, 'intersecting');
          } else if (!entry.isIntersecting) {
            console.log(entry.target.dataset.group, 'not-intersecting', scrollDirection);
          }
        });

        if (groupsInView.size > 0) {
          // Update the visible groups dynamically, ignoring duplicates
          setVisibleGroups((prev) => {
            const updatedGroups = [...new Set([...prev, ...groupsInView])];
            return updatedGroups;
          });
        }
      },
      { root: headerRef.current, rootMargin: '-16px 0px -340px 0px', threshold: 0 }, // Adjust threshold for triggering in view
    );
    headerRef.current.style.outline = '1px solid red';

    // Observe each group's header
    Object.values(groupRefs.current).forEach((groupElement) => {
      if (groupElement) observer.observe(groupElement);
    });

    return () => {
      observer.disconnect(); // Cleanup on unmount
      headerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto p-4 overflow-y-auto h-96" ref={headerRef}>
        {/* Sticky header that updates dynamically */}
        <div className="sticky top-0 bg-gray-100 text-gray-700 font-bold py-2">
          {visibleGroups.length > 0 && visibleGroups.join(' + ')}
        </div>

        {Object.keys(groupedContacts).map((group) => (
          <div key={group} className="group mb-6">
            {/* Set the ref for each group header */}
            <div
              ref={(el) => (groupRefs.current[group] = el)}
              data-group={group}
              className="bg-gray-200 text-gray-700 font-bold py-2"
            >
              {group}
            </div>
            <ul>
              {groupedContacts[group].map((contact, index) => (
                <li key={index} className="py-2 px-4 border-b">
                  {contact.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ContactList;
