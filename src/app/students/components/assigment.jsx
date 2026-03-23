import React, { useMemo, useState } from 'react';

const assigment = () => {
  const [activeCourse, setActiveCourse] = useState('MATH301');
  const [assignments, setAssignments] = useState([
    {
      id: 'a1',
      courseCode: 'MATH301',
      title: 'Problem Set 3 (Calculus Basics)',
      due: '2026-03-28',
      status: 'Pending',
      description: 'Solve 10 questions from the worksheet and upload a PDF solution.',
    },
    {
      id: 'a2',
      courseCode: 'MATH301',
      title: 'Quiz: Limits & Continuity',
      due: '2026-03-30',
      status: 'Pending',
      description: 'Online quiz. Complete before the deadline for full credit.',
    },
    {
      id: 'a3',
      courseCode: 'PHYS201',
      title: 'Lab Report: Projectile Motion',
      due: '2026-03-26',
      status: 'Completed',
      description: 'Submit lab observations, calculations, and graphs (as PDF).',
    },
    {
      id: 'a4',
      courseCode: 'CHEM101',
      title: 'Worksheet: Stoichiometry Practice',
      due: '2026-03-29',
      status: 'Pending',
      description: 'Answer all problems. Show working steps for each solution.',
    },
  ]);

  const courses = useMemo(() => {
    const set = new Set(assignments.map((a) => a.courseCode));
    return Array.from(set);
  }, [assignments]);

  const filtered = useMemo(() => {
    return assignments.filter((a) => a.courseCode === activeCourse);
  }, [assignments, activeCourse]);

  const completedCount = useMemo(() => {
    return filtered.filter((a) => a.status === 'Completed').length;
  }, [filtered]);

  const toggleCompleted = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
            ...a,
            status: a.status === 'Completed' ? 'Pending' : 'Completed',
          }
          : a
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">
          Track tasks per course. Mark items as completed to keep your progress updated.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {courses.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setActiveCourse(code)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              activeCourse === code
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Course: <span className="font-semibold text-gray-900">{activeCourse}</span>
          </p>
          <p className="text-sm text-gray-600">
            Completed: <span className="font-semibold text-gray-900">{completedCount}</span>/
            <span className="font-semibold text-gray-900">{filtered.length}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((a) => {
          const isDone = a.status === 'Completed';
          return (
            <div
              key={a.id}
              className={`rounded-2xl border p-5 ${
                isDone ? 'border-green-200 bg-green-50/30' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{a.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{a.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Due: <span className="font-medium text-gray-700">{a.due}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDone ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {a.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleCompleted(a.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isDone
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isDone ? 'Mark as Pending' : 'Mark Completed'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No assignments found for this course.
          </div>
        )}
      </div>
    </div>
  );
};

export default assigment;